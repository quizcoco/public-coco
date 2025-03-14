package com.quizcoco.web.controller;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.safety.Safelist;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.Board;
import com.quizcoco.web.entity.BoardLikeView;
import com.quizcoco.web.service.BoardService;
import com.quizcoco.web.service.CommentService;
import com.quizcoco.web.service.PostLikeService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RequestMapping("board")
public class BoardController {

    @Autowired
    private BoardService service;
    @Autowired
    private CommentService commentService;
    @Autowired
    private PostLikeService postLikeService;

//===============================================================================================================

    private static final List<String> ALLOWED_DOMAINS = Arrays.asList( //허용할 도메인
    "quizcoco.net"
);

public boolean isWhitelistedDomain(String url) {
    try {
        URI uri = new URI(url);
        
        // base64일 경우 허용 (절대 경로가 아닌 경우)
        if (uri.getHost() == null) {
            return url.startsWith("data:image/"); //참거짓 반환
        }
        
        // 절대 경로일 경우 도메인 검사
        String domain = uri.getHost();
        return ALLOWED_DOMAINS.stream().anyMatch(domain::endsWith);
        
    } catch (URISyntaxException e) {
        return false; // URL이 잘못된 경우 처리
    }
}

//=============================================================================================================
     public static String sanitize(String input) {
        Safelist safelist = Safelist.none()
                .addTags("img", "br") // 허용할 태그
                .addAttributes("img", "src", "width", "height","draggable","data-filename"); // img 태그 속성 추가
        
        return Jsoup.clean(input, safelist);
    }
//=================================================================================================================

    @GetMapping("list")
    public String list(Model model
                        ,@RequestParam(name="r", required = false) Integer recommend
                        ,@RequestParam(name="q", required = false) String query
                        ,@RequestParam(name="p", defaultValue = "1") Integer page
                        ,@RequestParam(name="s", required = false, defaultValue = "15") Integer size){


        if(recommend==null ||recommend==0){
            List<Board> list = service.getList(query, page, size);
            model.addAttribute("boardList",list);
        }
        else{
            List<BoardLikeView> list = service.getLikeList(recommend);
            model.addAttribute("boardList",list);
        }

        int count = service.getCount(query);

        Map<Long,Long> cmtCount = commentService.getCmtCount();
        Map<Long,Long> likesCount = postLikeService.getLikesCountMap();

        model.addAttribute("count",count);
        model.addAttribute("cmtCount",cmtCount);
        model.addAttribute("likesCount",likesCount);
        model.addAttribute("pageTitle","자유 게시판");

        return "board/list";
        
    }

    @GetMapping("reg")
    public String reg(Model model){

        model.addAttribute("pageTitle","게시글 작성");


        return "board/reg";
        
    }

    @GetMapping("detail")
    public String detail(Model model,Long id
                        ,@RequestParam(name="q", required = false) String query
                        ,@RequestParam(name="p", defaultValue = "1") Integer page
                        ,@RequestParam(name="s", required = false, defaultValue = "15") Integer size
                        ,@AuthenticationPrincipal CocoUserDetails userDetails) {

        Long userId=null;
        if(userDetails!=null)
        userId = userDetails.getId();
        
        //본문
        Board board = service.getById(id);
        model.addAttribute("post", board);
        
        //조회수
        board.setViewCount(board.getViewCount()+1);
        service.addViewCount(board);

        //목록
        List<Board> list = service.getList(query, page, size);
        Map<Long,Long> cmtCountMap = commentService.getCmtCount();
        Map<Long,Long> likesCountMap = postLikeService.getLikesCountMap();

        int count = service.getCount(query);

        //좋아요
        Integer likeCount =  postLikeService.getLikesCount(id);
        boolean hasliked = postLikeService.hasUserLiked(id,userId);


        model.addAttribute("boardList",list);
        model.addAttribute("count",count);
        model.addAttribute("likeCount",likeCount);
        model.addAttribute("hasliked",hasliked);
        model.addAttribute("cmtCountMap",cmtCountMap);
        model.addAttribute("likesCountMap",likesCountMap);
        model.addAttribute("pageTitle","자유 게시판");

        return "board/detail";
    }

    @GetMapping("edit")
    public String edit(Model model,Long id){

        Board board = service.getById(id);
        model.addAttribute("post", board);

        model.addAttribute("pageTitle","게시글 수정");


        return "board/edit";
        
    }
    

    @PostMapping("reg")
    public String reg(Board board
                            ,@AuthenticationPrincipal CocoUserDetails userDetails
                            ,@RequestParam("img-file") List<MultipartFile> imgFiles
                            ,HttpServletRequest request) throws IllegalStateException, IOException {
                                
                                Long userId=null;
                                if(userDetails!=null)
                                userId = userDetails.getId();
                                
                                // HTML 파싱을 위한 Jsoup 사용
                            String contentHtml = sanitize(board.getContent());  // 게시판 내용 (텍스트 + 이미지 포함) 하고 sanitize
                            Document doc = Jsoup.parse(contentHtml);

                            List<String> fileNames = new ArrayList<>();
                            String fileName = "";
                            String path = "/img/board";
                            
                            Elements imgElements = doc.select("img");
                            for (Element imgElement : imgElements){
                                //허용되지 않은 주소면 엘리먼트 제거
                                if(!isWhitelistedDomain(imgElement.attr("src")))
                                    imgElement.remove();
                                
                            }

    if (!imgFiles.isEmpty() && !imgElements.isEmpty()) {
        for (int i = 0; i < imgFiles.size(); i++) {
            MultipartFile imgFile = imgFiles.get(i);
            Element imgElement = imgElements.get(i); // 현재 img 태그
            
            if(imgFile != null && !imgFile.isEmpty())   
            {
                fileName = imgFile.getOriginalFilename();
                fileName = UUID.randomUUID().toString() + "_" + fileName;
            
                String realPath = request.getServletContext().getRealPath(path);
                File pathFile = new File(realPath);
                if(!pathFile.exists())
                pathFile.mkdirs();
                File file = new File(realPath+File.separator+fileName);
                
                // Elements spanElements = doc.select("span"); //span태그 제거 (지워)
                // spanElements.remove();
        
                imgFile.transferTo(file); //이미지를 경로에 저장
                
                imgElement.attr("src", path + "/" + fileName);
                fileNames.add(fileName);
            }
        }
    }
        // 이미지 태그 추출 및 파일로 저장
        // for (Element img : imgElements) {
        // }
          
        board.setContent(doc.body().html());
        board.setUserId(userId);
        service.add(board,fileNames);

        return "redirect:list";
    }

    @PostMapping("edit")
    public String edit(Board updated
                        ,@RequestParam(name = "existing-img",required = false) List<String> existingImg
                        ,@RequestParam("img-file") List<MultipartFile> imgFiles
                        ,HttpServletRequest request) throws IllegalStateException, IOException {

            Board board = service.getById((updated.getId()));
            

            List<String> fileNames = new ArrayList<>();
        for (MultipartFile imgFile : imgFiles)
        {                       
            String fileName = "";

            //새로 이미지 추가 
            if(imgFile != null && !imgFile.isEmpty())   
            {
                fileName = imgFile.getOriginalFilename();
                fileName = UUID.randomUUID().toString() + "_" + fileName;

                String path = "/img/board";
            
                String realPath = request.getServletContext().getRealPath(path);
                File pathFile = new File(realPath);
                if(!pathFile.exists())
                    pathFile.mkdirs();
                File file = new File(realPath+File.separator+fileName);
                
                imgFile.transferTo(file);

                fileNames.add(fileName);
            }

            //기존이미지 삭제시
            // if(existingImg==null || board.getImg().size() > existingImg.size()){
            //     service.delImgById(board.getId(), existingImg);

            // }
        }
          
        board.setTitle(updated.getTitle());
        board.setContent(updated.getContent());
        service.edit(board,fileNames);




        return "redirect:list";
    }

    @PreAuthorize("isAuthenticated() and ( @boardServiceImp.isOwner(#id))") //인가처리
    @PostMapping("del")
    public String del(Long id) {

        service.delById(id);
        
        return "redirect:list";
    }
    
    
}


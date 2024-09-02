package com.quizcoco.web.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
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
import com.quizcoco.web.service.BoardService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RequestMapping("board")
public class BoardController {

    @Autowired
    private BoardService service;

    @GetMapping("list")
    public String list(Model model){

        List<Board> list = service.getList();


        model.addAttribute("boardList",list);
        model.addAttribute("pageTitle","자유 게시판");

        return "board/list";
        
    }

    @GetMapping("reg")
    public String reg(Model model){

        model.addAttribute("pageTitle","게시글 작성");


        return "board/reg";
        
    }

    @GetMapping("detail")
    public String detail(Model model,Long id) {

        
        //본문
        Board board = service.getById(id);
        model.addAttribute("post", board);
        
        //조회수
        board.setViewCount(board.getViewCount()+1);
        service.addViewCount(board);

        //목록
        List<Board> list = service.getList();
        model.addAttribute("boardList",list);

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
                                
                            System.out.println("뭐 길면 얼마나길다고 지랄.."+board.getContent());
                                // HTML 파싱을 위한 Jsoup 사용
                            String contentHtml = board.getContent();  // 게시판 내용 (텍스트 + 이미지 포함)
                            Document doc = Jsoup.parse(contentHtml);

                            List<String> fileNames = new ArrayList<>();
                            String fileName = "";
                            String path = "/img/board";
                            
                            Elements imgElements = doc.select("img");

        // for (MultipartFile imgFile : imgFiles){
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
                
                Elements spanElements = doc.select("span"); //span태그 제거
                spanElements.remove();

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
            if(existingImg==null || board.getImg().size() > existingImg.size()){
                service.delImgById(board.getId(), existingImg);

            }
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


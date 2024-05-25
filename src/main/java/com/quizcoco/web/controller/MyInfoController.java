package com.quizcoco.web.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.Avatar;
import com.quizcoco.web.entity.User;
import com.quizcoco.web.service.AvatarService;
import com.quizcoco.web.service.CocoService;
import com.quizcoco.web.service.RankingService;
import com.quizcoco.web.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("myinfo")
public class MyInfoController {

    @Autowired
    private RankingService service;

    @Autowired
    private AvatarService avatarService;

    @Autowired
    private CocoService cocoService;

    @Autowired
    private UserService userService;

    @Value("${file.upload-dir}")
    private String uploadDirBase;


    @GetMapping("")
    public String myInfo(@AuthenticationPrincipal CocoUserDetails userDetails
                        , Model model) {
        
        // 유저 순위 가져오기
        String userId = userDetails.getUsername();
        int userRank = service.getUserRank(userId);
        
        model.addAttribute("userRank", userRank);

        // 유저 아바타 이미지 가져오기
        Long useredId = userDetails.getId();                    
        Avatar avatar = avatarService.getAvatarByUserId(useredId);
        String avatarImg = avatar.getImg();

        model.addAttribute("avatarImg", avatarImg);
        
        // 코코 이미지 가져오기
        String cocoImg = cocoService.getCocoImgUrl(useredId);

        model.addAttribute("cocoImg", cocoImg);                    
        
        // 유저 프로필 정보 가져오기
        User currentUser = userService.getByUserName(userId);
        model.addAttribute("currentUser", currentUser);
       
        // 유저 레벨, 경험치, 포인트 가져오기
        int userLevel = userService.getUserLevel(useredId);
        model.addAttribute("userLevel", userLevel);

        int userExp = userService.getUserExp(useredId);
        model.addAttribute("userExp", userExp);

        int userPoint = userService.getUserPoint(useredId);
        model.addAttribute("userPoint", userPoint);                    

        return "myinfo/index";
    }

    @GetMapping("edit")
    public String edit(@AuthenticationPrincipal CocoUserDetails userDetails
                        , Model model) {
        String userId = userDetails.getUsername();
        User currentUser = userService.getByUserName(userId);
        model.addAttribute("currentUser", currentUser);

        return "myinfo/edit";
    }

     // 유저 프로필 업데이트
    @PostMapping("edit")
    public String edit(
                       @AuthenticationPrincipal CocoUserDetails userDetails 
                       ,@RequestParam(value="nickname", required = false) String nickname
                       ,@RequestParam(value="message", required = false) String message
                       ,@RequestParam(value="img-file", required = false) MultipartFile imgFile
                       , HttpServletRequest request
                       ) throws IllegalStateException, IOException {
        

            // 사용자의 기존 정보 가져오기
            User currentUser = userService.getByUserName(userDetails.getUsername());
            
            if(imgFile != null && !imgFile.isEmpty()) {   
                String userId = String.valueOf(currentUser.getId());
                String realPath = System.getProperty("user.dir") + uploadDirBase + File.separator + userId;
                File dir = new File(realPath);

                if(!dir.exists()) {
                    dir.mkdirs();
                }

                //중복되지 않는 고유한 파일 이름 생성
                String originalFileName = imgFile.getOriginalFilename();
                String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;
                Path path = Paths.get(realPath, uniqueFileName);
                
                imgFile.transferTo(path.toFile());

                
                // 기존 이미지 삭제
                if (currentUser.getImg() != null) {
                    Path existingFilePath = Paths.get(realPath, currentUser.getImg());
                    if(Files.exists(existingFilePath)) {
                       Files.delete(existingFilePath);
                    }
                }

                currentUser.setImg(userId + "/" + uniqueFileName);
            }
               
                //닉네임이 입력되지 않은 경우 기존 닉네임 유지
                if(nickname !=null && !nickname.isEmpty()) {

                    currentUser.setNickName(nickname);
                }
                
                //메세지가 입력되지 않은 경우 기존 메세지 유지
                if(message !=null && !message.isEmpty()) {

                    currentUser.setMessage(message);
                }

                // 사용자 정보 저장 및 SecurityContext 업데이트        
                userService.updateUser(currentUser);

        
        return "redirect:/myinfo/edit";            
    }


    @GetMapping("bookmark")
    public String bookmark() {

        return "myinfo/bookmark";
    }

    @GetMapping("stemp")
    public String stemp() {
        
        return "myinfo/stemp";
    }

    @GetMapping("inventory")
    public String inventory() {

        return "myinfo/inventory";
    }
}

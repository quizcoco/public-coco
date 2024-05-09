package com.quizcoco.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.service.AvatarService;
import com.quizcoco.web.service.CocoService;
import com.quizcoco.web.service.RankingService;

@Controller
@RequestMapping("myinfo")
public class MyInfoController {

    @Autowired
    private RankingService service;

    @Autowired
    private AvatarService avatarService;

    @Autowired
    private CocoService cocoService;
    
    @GetMapping("")
    public String myInfo(@AuthenticationPrincipal CocoUserDetails userDetails
                        , Model model) {
        
        // 유저 순위 가져오기
        String userId = userDetails.getUsername();
        int userRank = service.getUserRank(userId);
        
        model.addAttribute("userRank", userRank);

        // 유저 아바타 이미지 가져오기
        Long useredId = userDetails.getId();                    
        String avatarImg = avatarService.getAvatarByUserId(useredId);

        model.addAttribute("avatarImg", avatarImg);
        
        // 코코 이미지 가져오기
        String cocoImg = cocoService.getCocoImgUrl(useredId);

        model.addAttribute("cocoImg", cocoImg);                    
        
        return "myinfo/index";
    }

    @GetMapping("edit")
    public String edit() {

        return "myinfo/edit";
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

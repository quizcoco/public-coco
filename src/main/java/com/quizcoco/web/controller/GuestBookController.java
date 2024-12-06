package com.quizcoco.web.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.config.security.CocoUserDetails;

@Controller
@RequestMapping("bbs")
public class GuestBookController {
    

    @GetMapping("{username}")
    public String getGuestBook(@PathVariable String username,@AuthenticationPrincipal CocoUserDetails userDetails, Model model){
        

        Long userId = null; 
        if(userDetails != null)
            userId=userDetails.getId();


        model.addAttribute("pageTitle", username+"의 방명록");

        
        return "bbs/index";
    }




}

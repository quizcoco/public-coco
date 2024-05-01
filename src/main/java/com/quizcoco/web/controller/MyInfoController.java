package com.quizcoco.web.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.config.security.CocoUserDetails;

@Controller
@RequestMapping("myinfo")
public class MyInfoController {
    
    @GetMapping("")
    public String myInfo(@AuthenticationPrincipal CocoUserDetails userDetails) {
        
        return "myinfo/index";
    }
}

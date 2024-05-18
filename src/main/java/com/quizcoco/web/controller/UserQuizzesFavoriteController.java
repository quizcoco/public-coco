package com.quizcoco.web.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.config.security.CocoUserDetails;


@Controller
@RequestMapping("study/favorite")
public class UserQuizzesFavoriteController {

    @GetMapping("list")
    public String list(
        
    // @AuthenticationPrincipal CocoUserDetails userDetails
    // ,@RequestParam(name="p", defaultValue = "1") Integer page
    // ,@RequestParam(name="s", required = false, defaultValue = "5") Integer size
    // ,@RequestParam(name = "newold", defaultValue = "0")Integer newOld
    
    ) {

        return "study/favorite/list";
    }
}

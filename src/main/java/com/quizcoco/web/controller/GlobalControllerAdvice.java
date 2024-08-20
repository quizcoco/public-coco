package com.quizcoco.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.User;
import com.quizcoco.web.service.UserService;

@ControllerAdvice //전역적으로 사용
public class GlobalControllerAdvice {

    @Autowired
    private UserService userService;

    @ModelAttribute
    public void currentUser(@AuthenticationPrincipal CocoUserDetails userDetails, Model model){
        String userId = userDetails.getUsername();
        User currentUser = userService.getByUserName(userId);
       
        model.addAttribute("currentUser", currentUser);

    }
    
}

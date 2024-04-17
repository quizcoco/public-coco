package com.quizcoco.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.service.UserService;

@Controller
@RequestMapping("user")
public class UserController {
    
    @Autowired
    private UserService service;
    
    @GetMapping("login")
    public String login() {
        
        return "user/login";
    }

    @GetMapping("sign")
    public String sign() {
        
        return "user/sign";
    }

}

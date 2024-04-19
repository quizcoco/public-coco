package com.quizcoco.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.service.MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("user")
public class UserController {
    
    @Autowired
    private MemberService service;
    
    @GetMapping("login")
    public String login() {
        
        return "user/login";
    }

    @PostMapping("login")
    public String login(String name, 
                        String password,
                        HttpServletResponse response) {
        
        // 아이디, 비번 일치
        boolean valid = service.validate(name,password);

        // 불일치
        if(!valid)
            return "redirect:login?error";
        
        Cookie uidCookie = new Cookie("uid", "1");
        uidCookie.setPath("/");    
        
        Cookie nameCookie = new Cookie("name", name);
        nameCookie.setPath("/");

        response.addCookie(uidCookie);
        response.addCookie(nameCookie);

        return "redirect:/index";
    }

    @GetMapping("sign")
    public String sign() {
        
        return "user/sign";
    }

}
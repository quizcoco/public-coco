package com.quizcoco.web.controller;

import java.io.IOException;
import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.entity.User;
import com.quizcoco.web.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("user")
public class UserController {
    
    @Autowired
    private UserService service;

    @Autowired
    private PasswordEncoder encoder;
    
    @GetMapping("login")
    public String login() {
        
        return "user/login";
    }

    @PostMapping("login")
    public String login(String username, 
                        String password,
                        HttpServletResponse response) {
        
         // 아이디로 사용자 정보 가져오기
         User user = service.getByUserName(username);
     
         if (user == null || !encoder.matches(password, user.getPw())) {
            return "redirect:/user/login?error";
         }

         
         Cookie uidCookie = new Cookie("uid", "1");
         uidCookie.setPath("/");    
         
         Cookie nameCookie = new Cookie("name", username);
         nameCookie.setPath("/");
 
         response.addCookie(uidCookie);
         response.addCookie(nameCookie);
         System.out.println("=============================="+username);
 
        return "redirect:/index";
    }

    @GetMapping("sign")
    public String sign() {
        
        return "user/sign";
    }

    @PostMapping("sign")
    public String sign(User user
                       , HttpServletRequest request
                       , Principal principal
                       ) throws IllegalStateException, IOException {
        
        //비밀번호 암호화
        
        if(user.getPw() == null) {
            throw new IllegalArgumentException("Input password");
        }

        String password = user.getPw();
        String encodedPw = encoder.encode(password);
        user.setPw(encodedPw);

       service.sign(user);
        
        return "redirect:/user/login";
    }


}
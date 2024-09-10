package com.quizcoco.web.controller;

import java.io.IOException;
import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.User;
import com.quizcoco.web.service.AvatarService;
import com.quizcoco.web.service.CocoService;
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
    private CocoService cocoService;

    @Autowired
    private AvatarService avatarService;

    @Autowired
    private PasswordEncoder encoder;
    
    @GetMapping("login")
    public String login(HttpServletRequest request, Model model) {

        model.addAttribute("pageTitle","Login");

        //요청 헤더의 Referer(이전페이지)를 세션에 저장
        String uri = request.getHeader("Referer");
    if (uri != null && !uri.contains("/login")) { // '/login'는 로그인 실패등의 이유
        request.getSession().setAttribute("prevPage", uri);
    }
    //XXX RequestURI 사용하는 경우 알아놓자
    // if (request.getRequestURI().startsWith("/reg") && !request.isUserInRole("ROLE_MEMBER")) {
    //     request.getSession().setAttribute("redirectUrl", request.getRequestURI());
    // }

        
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
    public String sign(Model model) {
        model.addAttribute("pageTitle","회원가입");

        
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

       //가입시 코코랑 아바타 최초 생성
       System.out.println("회원가입 유저아이디를 알아봅시다~~~~"+user.getId());
       cocoService.regCoco(user.getId());
       avatarService.regAvatar(user.getId());
        
        return "redirect:/user/login";
    }
    
}    
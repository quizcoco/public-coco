package com.quizcoco.web.controller.admin;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.config.security.CocoUserDetails;

@Controller("adminHomeController")
@RequestMapping("admin")
public class HomeController {
    
    @GetMapping("index")
    public String index(@CookieValue(required = false) Long uid,
                        Principal principal,
                        Authentication authentication,
                        @AuthenticationPrincipal CocoUserDetails userDetails){

        CocoUserDetails userDetail = (CocoUserDetails)authentication.getPrincipal();

                             
        return "admin/index";

    }

}

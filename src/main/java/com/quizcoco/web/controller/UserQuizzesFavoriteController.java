package com.quizcoco.web.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.config.security.CocoUserDetails;


@Controller
@RequestMapping("study/favorite")
public class UserQuizzesFavoriteController {

    @GetMapping("list")
    public String list(Model model) {

        model.addAttribute("pageTitle","문제 즐겨찾기");


        return "study/favorite/list";
    }
}

package com.quizcoco.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.entity.User;
import com.quizcoco.web.service.RankingService;

@Controller
@RequestMapping("ranking")
public class RankingController {

    @Autowired
    private RankingService service;
    
    @GetMapping("")
    public String ranking (Model model) {
        List<User> users = service.getUsersOrderByPoint();
        model.addAttribute("users", users);

        return "ranking/index";
    }

}

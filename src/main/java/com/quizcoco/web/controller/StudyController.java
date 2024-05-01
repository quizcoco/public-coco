package com.quizcoco.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.service.UserQuizService;

@Controller
@RequestMapping("study")
public class StudyController {

    @Autowired
    private UserQuizService service;

    @GetMapping("")
    public String studyIndex(){

        return "study/index";
    }

    @GetMapping("setting")
    public String studySetting(){

        return "study/setting";
    }

    @GetMapping("userquiz/detailspeed")
    public String settingSpeed(){

        return "study/userquiz/detailspeed";
    }
}

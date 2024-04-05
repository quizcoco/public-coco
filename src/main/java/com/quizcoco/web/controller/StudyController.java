package com.quizcoco.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("study")
public class StudyController {


    @GetMapping("userquiz/list")
    public String list(){


        return "userquiz/list";
    }   

    @GetMapping("")
    public String studyIndex(){

        return "study/index";
    }

    @GetMapping("setting")
    public String studySetting(){

        return "study/setting";
    }
}

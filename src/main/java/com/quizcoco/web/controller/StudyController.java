package com.quizcoco.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.service.ExamQuizService;
import com.quizcoco.web.service.UserQuizService;

@Controller
@RequestMapping("study")
public class StudyController {

    @Autowired
    private UserQuizService service;

    @Autowired
    private ExamQuizService examservice;

    @GetMapping("")
    public String studyIndex(Model model){

        // ExamQuiz latestQ = ((ExamQuizService) service).getLatestQuiz();
        ExamQuiz latestQ = examservice.getLatestQuiz();
        model.addAttribute("latestQ", latestQ);

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

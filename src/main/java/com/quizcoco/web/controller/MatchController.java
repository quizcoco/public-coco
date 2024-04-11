package com.quizcoco.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.service.ExamQuizService;

@Controller
@RequestMapping("study/self-match")
public class MatchController {

    @Autowired
    private ExamQuizService examQService;

    @GetMapping("match")
    public String load(Model model){

        ExamQuiz randQ = examQService.getRand();

        model.addAttribute("randQ", randQ);


        return "study/self-match/match";

    }
    
}

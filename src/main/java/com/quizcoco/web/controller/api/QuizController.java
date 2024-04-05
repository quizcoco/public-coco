package com.quizcoco.web.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.service.ExamQuizService;

@RequestMapping("api/examQuizs")
@RestController("apiQuizController")
public class QuizController {

    @Autowired
    private ExamQuizService service;

    @GetMapping
    public List<ExamQuiz> list(
         @RequestParam(name = "q",required = false) String query,
                       @RequestParam(name = "p",required = false, defaultValue = "1") Integer page
    ){

       List<ExamQuiz> examQuizs = new ArrayList<>();

        if(query != null){
            examQuizs =service.getList(page,query);
        }
        else {
            examQuizs =service.getList(page);
        }
        
        return examQuizs;
    }

    
}

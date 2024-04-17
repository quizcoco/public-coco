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
    private ExamQuizService eqService;

    @GetMapping
    public List<ExamQuiz> list(
                       @RequestParam(name = "q",required = false) String query
                       ,@RequestParam(name = "p",required = false, defaultValue = "1") Integer page
                       ,@RequestParam(name = "exam-official-rank-id",required = false,defaultValue = "0") Integer examOfficialRankId
                       ,@RequestParam(name = "type-id",required = false, defaultValue = "0") Integer typeId
                       ,@RequestParam(required = false,defaultValue = "0") Integer year
                       ,@RequestParam(required = false) Integer secret
                       ,@RequestParam(required = false, defaultValue = "10") Integer size
    ){

       List<ExamQuiz> examQuizs = new ArrayList<>();

       
       if(query != null){
           examQuizs =eqService.getList(page,query,size);
        }
        else if(secret != null){
            examQuizs =eqService.getList(page,secret,size);
        }
        else if(year != null && typeId != null && examOfficialRankId != null){
            examQuizs =eqService.getList(page,typeId,year,examOfficialRankId,size);
        }
        else {
            examQuizs =eqService.getList(page,size);
        }
        
        return examQuizs;
    }

    @GetMapping("rand")
    public ExamQuiz random(){

        ExamQuiz random = eqService.getRand();
       
        return random;

    }
    
}

package com.quizcoco.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.service.UserQuizService;

@RequestMapping("api/userQuizs")
@RestController("apiUserQuizController")
public class UserQuizController {

    @Autowired
    private UserQuizService service;

    // @GetMapping("detail")
    // public UserOXQuiz detail(Long id) {
    
    //     UserOXQuiz userOXQuiz = service. getByOXQuizId(id);
    
    //     // UserShortQuiz userShortQuiz = uqService.getByShortQuizId(id);
    //     // UserMultipleQuiz userMultipleQuiz = uqService.getByMultipleQuizId(id);
    
    //     return userOXQuiz;
    // }


    @DeleteMapping
    public String delete(Long id){
        return null;
    }


}
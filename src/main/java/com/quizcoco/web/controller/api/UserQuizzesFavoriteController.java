package com.quizcoco.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.entity.UserQuizzesFavorite;
import com.quizcoco.web.service.UserQuizzesFavoriteService;

@RestController
@RequestMapping("api/user-quizzes-favorites")
public class UserQuizzesFavoriteController {
    
    @Autowired
    private UserQuizzesFavoriteService service;

    @PostMapping
    public UserQuizzesFavorite add(
        @RequestBody UserQuizzesFavorite favorite){
        System.out.println(favorite);
        UserQuizzesFavorite newOne = service.add(favorite);

        return newOne;
    }

    @DeleteMapping
    public String delete(Long id){
        return null;
    }
}

package com.quizcoco.web.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserQuizzesFavorite;
import com.quizcoco.web.service.UserQuizzesFavoriteService;

@RestController("apiFavoriteController")
@RequestMapping("api/favorites") //이름너무길다
public class FavoriteController {
    
    @Autowired
    private UserQuizzesFavoriteService service;

    @GetMapping("list")
    public List<UserQuizView> getFavoriteList(@AuthenticationPrincipal CocoUserDetails userDetails
    ,@RequestParam(name="s", required = false, defaultValue = "5") Integer size) {

        Long userId = null; 
        if(userDetails != null)
        userId=userDetails.getId();

        List<UserQuizView> userQuizView = new ArrayList<>();

        userQuizView = service. getList(userId, size);

        return userQuizView;
    }
}

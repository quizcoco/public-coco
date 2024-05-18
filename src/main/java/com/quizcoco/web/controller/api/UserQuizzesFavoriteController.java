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

@RestController("apiUserQuizzesFavoriteController")
@RequestMapping("api/user-quizzes-favorites") //이름너무길다
public class UserQuizzesFavoriteController {
    
    @Autowired
    private UserQuizzesFavoriteService service;

    @GetMapping("add")
    // @PostMapping("add")
    public ResponseEntity<Boolean> add(
        @RequestParam("id")String id,
        @RequestParam("category")String category,
        @AuthenticationPrincipal CocoUserDetails userDetails

        ){


        Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();

        // 이거나와서 위에 두개를 불러오는것까지는 됐음...
        System.out.println("===========출력====="+id+category);
        System.out.println("================");


        Long quizId = Long.parseLong(id);


        UserQuizzesFavorite favorite = new UserQuizzesFavorite();
        favorite.setUserId(userId);

        if(category.equals("short"))
        favorite.setUserShortAnswerQuizId(quizId);

        if(category.equals("multi"))
        favorite.setUserMultipleChoiceQuizId(quizId);
        
        if(category.equals("ox"))
        favorite.setUserOxId(quizId);
                                                    // 여기에 담아야한다
        boolean isSuccess = service.add(favorite);



        if (isSuccess) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }

    }


    @GetMapping("fav")
    // @PostMapping("add")
    public ResponseEntity<Boolean> isFavorite(
        @RequestParam("id")String id,
        @RequestParam("category")String category,
        @AuthenticationPrincipal CocoUserDetails userDetails

        ){


        Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();

  


        Long quizId = Long.parseLong(id);


        UserQuizzesFavorite favorite = new UserQuizzesFavorite();
        favorite.setUserId(userId);

        if(category.equals("short"))
        favorite.setUserShortAnswerQuizId(quizId);

        if(category.equals("multi"))
        favorite.setUserMultipleChoiceQuizId(quizId);
        
        if(category.equals("ox"))
        favorite.setUserOxId(quizId);
                                                    // 여기에 담아야한다
        boolean isSuccess = service.isFavorite(favorite);



        if (isSuccess) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    
    }

    @GetMapping("del")
    public ResponseEntity<Boolean> delete(Long id,        
                        @RequestParam("category")String category,
                        @AuthenticationPrincipal CocoUserDetails userDetails){

    Long userId=null;
    if(userDetails != null)
        userId=userDetails.getId();



              // 이거나와서 위에 두개를 불러오는것까지는 됐음...
              System.out.println("===========출력====="+id+category);
              System.out.println("================");


        UserQuizzesFavorite favorite = new UserQuizzesFavorite();
        favorite.setUserId(userId);

        if(category.equals("short"))
        favorite.setUserShortAnswerQuizId(id);

        if(category.equals("multi"))
        favorite.setUserMultipleChoiceQuizId(id);
        
        if(category.equals("ox"))
        favorite.setUserOxId(id);
                                                    // 여기에 담아야한다
        boolean isSuccess = service.cancel(favorite);


        if (isSuccess) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }

    }

    // @GetMapping("list")
    // public List<UserQuizView> getFavoriteList( @AuthenticationPrincipal CocoUserDetails userDetails
    // ,@RequestParam(name="p", defaultValue = "1") Integer page
    // ,@RequestParam(name="s", required = false, defaultValue = "5") Integer size
    // ,@RequestParam(name = "newold", defaultValue = "0")Integer newOld) {

    //     Long userId = null; 
    //     if(userDetails != null)
    //     userId=userDetails.getId();

    //     int UQcount = 0;

    //     List<UserQuizView> userQuizView = new ArrayList<>();
    //     // if(query != null){
    //     // userQuizView = service. getList(query,userId,newOld,page, size);
    //     // UQcount = service.getCount(query,userId);
    //     // }

    //     userQuizView = service. getList(userId,newOld,page, size);
    //     UQcount = service.getCount(userId);

    //     return userQuizView;
    // }
}

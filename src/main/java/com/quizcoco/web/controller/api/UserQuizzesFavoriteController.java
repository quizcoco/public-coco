package com.quizcoco.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.UserQuizzesFavorite;
import com.quizcoco.web.service.UserQuizzesFavoriteService;

@RestController
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
        // System.out.println("================"+favorite );

        // //추가했는지 확인
        // if(newOne==null){
        //    return ResponseEntity.badRequest().body(false);
        // }
        
        // return ResponseEntity.ok(true);
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
}

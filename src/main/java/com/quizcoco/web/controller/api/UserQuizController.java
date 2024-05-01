package com.quizcoco.web.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserShortQuiz;
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
    public String delete(String id,String cate){


        return null;
    }


    // @GetMapping("/1")
    // public UserQuizView get(Long id){
    //     return null;
    // }




    

//수정페이지
    @GetMapping("edit")
    public UserQuizView edit(@RequestParam("id") Long id
                           ,@AuthenticationPrincipal CocoUserDetails userDetails
                        // ,@RequestParam(defaultValue = "1"/* ☆임시-userid(첫번째)*/) Long userId
                        ,@RequestParam(name = "category") String cate
                        ){

        // UserOXQuiz userOXQuiz;
        // UserMultipleQuiz userMultiQuiz;
        // UserShortQuiz userShortQuiz;

        // UserQuizView userQuiz;

        Long userId = null;
        if(userDetails != null)
                userId = userDetails.getId();   


        System.out.println("================================================"+id+cate);
        // if(cate.equals("ox")){

            UserQuizView userQuiz = service.getListById(id, userId, cate);

        // model.addAttribute("examq", userQuiz);}

        //  if(cate.equals("multi")){
        //  userMultiQuiz = service.getByMultipleQuizId(id);
        //  model.addAttribute("examq", userMultiQuiz);}

        //  if(cate.equals("short")){
        //  userShortQuiz = service.getByShortQuizId(id);
        //  model.addAttribute("examq", userShortQuiz);}

        return userQuiz;
    }



    @GetMapping("detail")
    public List<UserQuizView> detail(@RequestParam(name="no", defaultValue = "1") Integer page
                                    ,@AuthenticationPrincipal CocoUserDetails userDetails
                                    ,@RequestParam(name = "newold", defaultValue = "0")Integer newOld){

        Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();
                                

         List<UserQuizView> userQuizs = new ArrayList<>();
         userQuizs = service. getOne(userId, newOld, page);


        return userQuizs;
    }

    @GetMapping("count")
    public int count(@AuthenticationPrincipal CocoUserDetails userDetails
    ){

        Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();

        int count = service.getCount(userId);

        return count;
    }

    // @GetMapping("list")
    // public List<UserQuizView> list(){


    //     return list;
    // }

}
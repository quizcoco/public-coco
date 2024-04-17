package com.quizcoco.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserShortQuiz;
import com.quizcoco.web.service.UserQuizService;

@Controller
@RequestMapping("study/userquiz")
public class QuizController {
   
    @Autowired
    private UserQuizService service;






    @GetMapping("list")
    public String list(@RequestParam(defaultValue = "0"/* ☆임시*/) Long userId, Model model) {

        System.out.println("----------------------------"+userId);

        if(userId==null) {
            return "";
        }

        List<UserOXQuiz> userOXQuiz = new ArrayList<>();
        if(userId != null)
        userOXQuiz = service. getList(userId);
        
        model.addAttribute("useroxq", userOXQuiz);

        System.out.println("============================="+userOXQuiz);

        return "study/userquiz/list";
    }   

    // @GetMapping("detail")
    // public String detail () {

    //     return "study/userquiz/detail";

    // }


    // 유저가 만든 문제 디테일 페이지
    @GetMapping("detail")
    public String detail(Long id, Model model) {

        if(id==null) {
            return "study/userquiz/list";
        }

        UserOXQuiz userOXQuiz = service. getByOXQuizId(id);
        model.addAttribute("useroxq", userOXQuiz);

        UserShortQuiz userShortQuiz = service.getByShortQuizId(id);
        model.addAttribute("usershortq", userShortQuiz);

        UserMultipleQuiz userMultipleQuiz = service.getByMultipleQuizId(id);
        model.addAttribute("usermultiq", userMultipleQuiz);


        return "study/userquiz/detail";
    }

}

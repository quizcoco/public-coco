package com.quizcoco.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserShortQuiz;
import com.quizcoco.web.service.UserQuizService;

@Controller
@RequestMapping("userquiz")
public class QuizController {
   
    @Autowired
    private UserQuizService service;

    @GetMapping("userquiz/detail")
    public String detail () {

        return "userquiz/detail";

    }


    // 유저가 만든 문제 디테일 페이지
    @GetMapping("detail")
    public String detail(Long id, Model model) {

        if(id==null) {
            return "userquiz/detail";
        }

        UserOXQuiz userOXQuiz = service. getByOXQuizId(id);
        model.addAttribute("useroxq", userOXQuiz);

        UserShortQuiz userShortQuiz = service.getByShortQuizId(id);
        model.addAttribute("usershortq", userShortQuiz);

        UserMultipleQuiz userMultipleQuiz = service.getByMultipleQuizId(id);
        model.addAttribute("usermultiq", userMultipleQuiz);


        return "userquiz/detail";
    }

}

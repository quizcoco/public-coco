package com.quizcoco.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserShortQuiz;
import com.quizcoco.web.service.UserQuizService;

@Controller
@RequestMapping("study/userquiz")
public class UserQuizController {
   
    @Autowired
    private UserQuizService service;

    @GetMapping("list")
    public String list(Model model
                        ,@RequestParam(defaultValue = "1"/* ☆임시-userid(첫번째)*/) Long userId
                        ,@RequestParam(name="q", required = false) String query
                        ,@RequestParam(name="p", defaultValue = "1") Integer page
                        ,@RequestParam(name="num", required = false, defaultValue = "5") Integer size) {

        System.out.println("----------------------------"+userId+size);

        if(userId==null) {
            return "";
        }
        int count = 0;;

        List<UserOXQuiz> userOXQuiz = new ArrayList<>();
        if(query != null){
            userOXQuiz = service. getList(query,userId,page, size);
            count = service.getCount(query);
        }
        else{
            userOXQuiz = service. getList(userId,page, size);
            count = service.getCount();
        }

        model.addAttribute("useroxq", userOXQuiz);
        model.addAttribute("count", count);

        System.out.println("============================="+userOXQuiz);

        return "study/userquiz/list";
    }   

    // @GetMapping("detail")
    // public String detail () {
    //     return "study/userquiz/detail";
    // }

    // 3개로 나눠서 detail로 보냄
    /* 유저가 만든 문제 디테일 페이지 // js말고 컨트롤러에서 직접 분류나눠서 뿌려주기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    /* OXㅡㅡㅡuser_oxㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    @GetMapping("detail/ox")
    public String detailOx(Long id, Model model) {

        if(id==null) {
            return "study/userquiz/list";
        }

        UserOXQuiz userOXQuiz = service. getByOXQuizId(id);
        model.addAttribute("useroxq", userOXQuiz);

        return "study/userquiz/detail";
    }

    /* 사지선다ㅡㅡㅡuser_multiple_choice_quizㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    @GetMapping("detail/multi")
    public String detailMulti(Long id, Model model) {

        if(id==null) {
            return "study/userquiz/list";
        }

        UserMultipleQuiz userMultipleQuiz = service.getByMultipleQuizId(id);
        model.addAttribute("usermultiq", userMultipleQuiz);

        return "study/userquiz/detail";
    }

    /* 단답ㅡㅡㅡshort_answer_quizㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    @GetMapping("detail/short")
    public String detailShort(Long id, Model model) {

        if(id==null) {
            return "study/userquiz/list";
        }

        UserShortQuiz userShortQuiz = service.getByShortQuizId(id);
        model.addAttribute("usershortq", userShortQuiz);

        return "study/userquiz/detail";
    }
    
    /* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */

    // 유저 문제 등록 페이지
    @GetMapping("reg")
    public String reg() {
        return "userquiz/reg";
    }

    @GetMapping("reg/ox")
    public String regOX() {

        return "userquiz/reg/ox";
    }

    @PostMapping("reg/ox")
    public String regOX(UserOXQuiz userOXQuiz) {

        service.regOX(userOXQuiz);
        
        return "redirect:reg/ox";
    } 

    @GetMapping("reg/multi")
    public String regMulti() {

        return "userquiz/reg/multi";
    }

    @PostMapping("reg/multi")
    public String regMulti(UserMultipleQuiz userMultipleQuiz) {

        service.regMulti(userMultipleQuiz);
        
        return "redirect:reg/multi";
    } 

    @GetMapping("reg/short")
    public String regShort() {

        return "userquiz/reg/short";
    }

    @PostMapping("reg/short")
    public String regShort(UserShortQuiz userShortQuiz) {

        service.regShort(userShortQuiz);
        
        return "redirect:reg/short";
    } 
}

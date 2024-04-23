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
import com.quizcoco.web.entity.UserQuizView;
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
                        ,@RequestParam(name="num", required = false, defaultValue = "5") Integer size
                        ,@RequestParam(name = "newold", defaultValue = "0")Integer newOld) {

        int UQcount = 0;

        List<UserQuizView> userQuizView = new ArrayList<>();
        if(query != null){
            userQuizView = service. getList(query,userId,newOld,page, size);
            UQcount = service.getCount(query);
        }
        else{
            userQuizView = service. getList(userId,newOld,page, size);
            UQcount = service.getCount();
        }

        System.out.println("===========UserQuizController.java==============");
        System.out.println("========================UQcount = "+UQcount); //39잘나옴
        
        model.addAttribute("userQuiz", userQuizView);
        model.addAttribute("uqcount", UQcount);
        
        
        //=============================ox============================================
        
        //                     System.out.println("----------------------------"+userId+size);

        // if(userId==null) {
        //     return "";
        // }
        // int count = 0;;

        // List<UserOXQuiz> userOXQuiz = new ArrayList<>();
        // if(query != null){
        //     userOXQuiz = service. getOXList(query,userId,page, size);
        //     count = service.getCount(query);
        // }
        // else{
        //     userOXQuiz = service. getOXList(userId,page, size);
        //     count = service.getCount();
        // }

        // model.addAttribute("useroxq", userOXQuiz);
        // model.addAttribute("count", count);

        // System.out.println("============================="+userOXQuiz);

        return "study/userquiz/list";
    }   

    // @GetMapping("detail")
    // public String detail () {
    //     return "study/userquiz/detail";
    // }

    // 3개로 나눠서 detail로 보냄
    /* 유저가 만든 문제 디테일 페이지 // js말고 컨트롤러에서 직접 분류나눠서 뿌려주기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    /* OXㅡㅡㅡuser_oxㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
    @GetMapping("detail")
    public String detail(Long id
    ,@RequestParam(defaultValue = "1"/* ☆임시-userid(첫번째)*/) Long userId
    ,@RequestParam(name = "category") String cate
    ,Model model) {


        UserQuizView userQuizView = service.getListById(id, userId, cate);
        int count = 0;

        if(id==null) {
            return "study/userquiz/list";
        }

        model.addAttribute("userQuiz", userQuizView);
                                    
        count = service.getCount();
        model.addAttribute("count", count);

        // UserOXQuiz userOXQuiz = service. getByOXQuizId(id);
        // UserMultipleQuiz userMultipleQuiz = service.getByMultipleQuizId(id);
        // UserShortQuiz userShortQuiz = service.getByShortQuizId(id);
        
        // if(userOXQuiz!=null&& userQuizView.getId()==userOXQuiz.getId() && userQuizView.getCategory().equals("ox"))
        // model.addAttribute("useroxq", userOXQuiz);
        
        // if(userMultipleQuiz !=null&& userQuizView.getId()==userMultipleQuiz.getId() && userQuizView.getCategory().equals("multi"))
        // model.addAttribute("usermultiq", userMultipleQuiz);
        
        // if(userShortQuiz != null && userQuizView.getId()==userShortQuiz.getId() && userQuizView.getCategory().equals("short"))
        //     model.addAttribute("usershortq", userShortQuiz);


        // System.out.println("============================"+userOXQuiz);
        // System.out.println(userMultipleQuiz);
        // System.out.println(userShortQuiz);
        
           
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
        return "study/userquiz/reg";
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

    //삭제
    @PostMapping("del")
    public String del(@RequestParam("id") Long id, @RequestParam("category") String cate){

        service.delById(id, cate);

        return "redirect:list";

    }

}

package com.quizcoco.web.controller.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.service.ExamQuizService;

import jakarta.servlet.http.HttpServletResponse;

@Controller("adminQuizController")
@RequestMapping("admin/examquiz")
public class QuizController {

    @Autowired
    private ExamQuizService service;
    
    //리스트페이지
    @GetMapping("list") 
    public String list(Model model
                    ,@RequestParam(name = "q",required = false) String query
                    ,@RequestParam(name = "p",required = false, defaultValue = "1") Integer page
                    ,@RequestParam(name = "exam-official-rank-id",required = false,defaultValue = "0") Integer examOfficialRankId
                       ,@RequestParam(name = "type-id",required = false, defaultValue = "0") Integer typeId
                       ,@RequestParam(required = false,defaultValue = "0") Integer year
                       ,@RequestParam(required = false) Integer secret
                       ,@RequestParam(required = false, defaultValue = "10") Integer size
                       ,HttpServletResponse response
                       ,@AuthenticationPrincipal CocoUserDetails userDetails
                    ){
        
        Long userId = null;
        if(userDetails != null)
                userId = userDetails.getId();                   

        List<ExamQuiz> list = new ArrayList<>();
        int count = 0;

        if(query != null){
            list =service.getList(page,query,size);
            count = service.getCount(query);
        }
        else if(secret != null){
            list =service.getList(page,secret,size);
        }
        else if(year != null && typeId != null && examOfficialRankId != null){
            list =service.getList(page,typeId,year,examOfficialRankId,size);
        }
        else {
            list =service.getList(page,size);
            count = service.getCount();
        }

        model.addAttribute("list", list);
        model.addAttribute("count", count);

        return "admin/examquiz/list";

    }

    //디테일 페이지
    @GetMapping("detail")
    public String detail(Long id,Model model){

        ExamQuiz examQuiz = service.getById(id);

        model.addAttribute("examq", examQuiz);

        return "admin/examquiz/detail";

    }

    //등록 페이지
    @GetMapping("reg")
    public String reg(){

        return "admin/examquiz/reg";

    }
    //등록
    @PostMapping("reg")
    public String reg(ExamQuiz examQuiz){

        service.reg(examQuiz);

        return "redirect:reg";
    }

    //=========================================테스트===================================================
    //수정페이지
    @GetMapping("edit")
    public String edit(@RequestParam("id") Long id,Model model){

        ExamQuiz examQuiz = service.getById(id);

        model.addAttribute("examq", examQuiz);

        return "admin/examquiz/edit";
    }

    //수정
    @PostMapping("edit")
    public String edit(@RequestParam("id") Long id, ExamQuiz updated){
        ExamQuiz examQuiz = service.getById(id);
         examQuiz.setYear(updated.getYear());
         examQuiz.setQuestion(updated.getQuestion());
         examQuiz.setContext(updated.getContext());
         examQuiz.setNum1(updated.getNum1());
         examQuiz.setNum2(updated.getNum2());
         examQuiz.setNum3(updated.getNum3());
         examQuiz.setNum4(updated.getNum4());
         examQuiz.setAnswer(updated.getAnswer());
         examQuiz.setTypeId(updated.getTypeId());
         examQuiz.setExamOfficialRankId(updated.getExamOfficialRankId());//exam_official_rank_id
         examQuiz.setSecret(updated.getSecret());

         service.edit(examQuiz);

        return "redirect:list";
    }

    //삭제
    @PostMapping("del")
    public String del(@RequestParam("id") Long id){

        service.delById(id);

        return "redirect:list";

    }

    
}

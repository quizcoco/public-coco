package com.quizcoco.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.service.ExamQuizService;

@Controller
@RequestMapping("study/search")
public class SearchController {

    @Autowired
    private ExamQuizService service;
    
    @GetMapping("")
    public String searchIndex(Model model){

        ExamQuiz randQ = service.getRand();
        model.addAttribute("randQ", randQ);
        model.addAttribute("pageTitle","퀴즈검색");


        return "study/search/index";
    }

    @GetMapping("result")
    public String searchResult(Model model
        ,@RequestParam(name = "q",required = false) String query
        ,@RequestParam(name = "p",required = false, defaultValue = "1") Integer page
        ,@RequestParam(name = "exam-official-rank-id",required = false,defaultValue = "0") Integer examOfficialRankId
       ,@RequestParam(name = "type-id",required = false, defaultValue = "0") Integer typeId
       ,@RequestParam(required = false,defaultValue = "0") Integer year
       ,@RequestParam(required = false) Integer secret
       ,@RequestParam(name = "s", required = false, defaultValue = "100") Integer size
    ){

        System.out.println("--------------------------"+query); //여기까지 확인


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
        
        System.out.println("----------리스트----------------"+list);

        model.addAttribute("list", list);
        model.addAttribute("count", count);
        model.addAttribute("pageTitle","검색 결과");


        return "study/search/result";
    }

    @GetMapping("record")
    public String searchRecord(Model model){

        model.addAttribute("pageTitle","내가 본 문제 기록");


        return "study/search/record";
    }
}

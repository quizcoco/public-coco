package com.quizcoco.web.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.service.ExamQuizService;
import com.quizcoco.web.service.MatchReportService;

@Controller
@RequestMapping("study/self-match")
public class MatchController {

    @Autowired
    private ExamQuizService examQService;

    @Autowired
    private MatchReportService reportService;

    @GetMapping("match")
    public String load(Model model){

        ExamQuiz randQ = examQService.getRand();

        model.addAttribute("randQ", randQ);

        return "study/self-match/match";

    }
    @GetMapping("report")
    public String studyReport(Model model){

    //    ExamQuiz examQuiz =  examQService.getById(18);
    //    model.addAttribute("wrongQ", examQuiz);

      //=======================================퀴즈부르기========================================================

      List<ExamQuiz> list = new ArrayList<>();
    //   for (String v : wrongIdDataValues) {
    //       list.add(examQService.getById(Long.parseLong(v.trim()))) ;
    //   }
    //   System.out.println(list);
    //   model.addAttribute("wrongQ", list);
      
        
        return "study/self-match/report";
    }
    
    @PostMapping("reg")
    public String regMatchResolt(@RequestParam(name ="cocoId",required = false) Long cocoId ,Long[] wrongId,Long[] correctId,Long[] allQuizId,Long enemyId,Long avatarId ,boolean win
                                ,@AuthenticationPrincipal CocoUserDetails userDetails,RedirectAttributes redirectAttributes
    ){
        Long userId = null;
        if(userDetails != null)
        userId=userDetails.getId();
        System.out.println("총 결과는 무엇입니까:"+allQuizId.length);
        System.out.println("맞힌 결과는 무엇입니까:"+correctId.length);
        
        
        String allQuizIdData =Arrays.toString(allQuizId);
        String wrongIdData =Arrays.toString(wrongId);
        String correctIdData =Arrays.toString(correctId);
        // System.out.println("결과는 무엇입니까:"+correctIdData.length());//2
        String trimmedAll = allQuizIdData.substring(1, allQuizIdData.length() - 1);
        String trimmedWrongId = wrongIdData.substring(1, wrongIdData.length() - 1);
        String trimmedCorrectId = correctIdData.substring(1, correctIdData.length() - 1);

        // 쉼표로 문자열을 나눔
        String[] allQuizIdDataValues = trimmedAll.split(",");
        String[] wrongIdDataValues = trimmedWrongId.split(",");
        String[] correctIdDataValues = trimmedCorrectId.split(",");

        for (String value : allQuizIdDataValues) {
            
            boolean wrong =false;
            for(String v: wrongIdDataValues){
            if(value.equals(v))
                wrong=true;
                
            
            }
            Long quiz = Long.parseLong(value.trim());
                // System.out.println(quiz);
            reportService.reg(userId,quiz,wrong);

        }
      //=======================================퀴즈 보고서========================================================

      System.out.println("이겼나요?"+win);
      redirectAttributes.addFlashAttribute("win", win);

      if (allQuizId.length==0){
        redirectAttributes.addFlashAttribute("allQ", null);
        return "redirect:report";
      }
        List<ExamQuiz> allList = new ArrayList<>();
        for (String v : allQuizIdDataValues) {
            allList.add(examQService.getById(Long.parseLong(v.trim()))) ;
      }
        redirectAttributes.addFlashAttribute("allQ", allList);

        
        
        if (wrongId.length==0){//다맞음
            redirectAttributes.addFlashAttribute("wrongQ", null);
            List<ExamQuiz> correctList = new ArrayList<>();
            for (String v : correctIdDataValues) {
                correctList.add(examQService.getById(Long.parseLong(v.trim()))) ;
            }
            redirectAttributes.addFlashAttribute("correctQ", correctList);
            return "redirect:report";
        }
        
        if (correctId.length==0){//다틀림
            redirectAttributes.addFlashAttribute("correctQ", null);
            List<ExamQuiz> wrongList = new ArrayList<>();
            for (String v : wrongIdDataValues) {
              wrongList.add(examQService.getById(Long.parseLong(v.trim()))) ;
            }
            redirectAttributes.addFlashAttribute("wrongQ", wrongList);
            return "redirect:report";
        }
    
      List<ExamQuiz> wrongList = new ArrayList<>();
      for (String v : wrongIdDataValues) {
        wrongList.add(examQService.getById(Long.parseLong(v.trim()))) ;
      }
      redirectAttributes.addFlashAttribute("wrongQ", wrongList);

    List<ExamQuiz> correctList = new ArrayList<>();
        for (String v : correctIdDataValues) {
            correctList.add(examQService.getById(Long.parseLong(v.trim()))) ;
        }
        redirectAttributes.addFlashAttribute("correctQ", correctList);
    
      
  
   

    return "redirect:report";
                

    }
    
}

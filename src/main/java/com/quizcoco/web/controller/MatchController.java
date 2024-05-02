package com.quizcoco.web.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.entity.MatchReport;
import com.quizcoco.web.service.ExamQuizService;

@Controller
@RequestMapping("study/self-match")
public class MatchController {

    @Autowired
    private ExamQuizService examQService;

    @GetMapping("match")
    public String load(Model model){

        ExamQuiz randQ = examQService.getRand();

        model.addAttribute("randQ", randQ);

        return "study/self-match/match";

    }
    @GetMapping("report")
    public String studyReport(){
        
        return "study/self-match/report";
    }
    
    @PostMapping("reg")
    public String regMatchResolt(@RequestParam(name ="cocoId",required = false) Long cocoId ,Long[] wrongId,Long[] correctId,Long enemyId,Long avatarId                       
                                ,@AuthenticationPrincipal CocoUserDetails userDetails
    ){
        Long userId = null; 
        if(userDetails != null)
        userId=userDetails.getId();

        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"+cocoId);
        System.out.println(Arrays.toString(wrongId));
        System.out.println(Arrays.toString(correctId));
        
       
        String wrongIdData =Arrays.toString(wrongId);
        String trimmed = wrongIdData.substring(1, wrongIdData.length() - 1);

        // 쉼표로 문자열을 나누어 키-값 쌍을 얻음
        String[] wrongIdDataValues = trimmed.split(",");

        // 각 키-값 쌍을 처리하여 필요한 작업 수행
        for (String value : wrongIdDataValues) {
            
            System.out.println(value);
        }
                
        return "redirect:report";

    }
    
}

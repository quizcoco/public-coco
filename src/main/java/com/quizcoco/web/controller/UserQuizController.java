package com.quizcoco.web.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.config.security.CocoUserDetails;
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
                        ,@AuthenticationPrincipal CocoUserDetails userDetails
                        ,@RequestParam(name="q", required = false) String query
                        ,@RequestParam(name="p", defaultValue = "1") Integer page
                        ,@RequestParam(name="s", required = false, defaultValue = "5") Integer size
                        ,@RequestParam(name = "newold", defaultValue = "0")Integer newOld) {

        Long userId = null; 
        if(userDetails != null)
        userId=userDetails.getId();

        int UQcount = 0;

        List<UserQuizView> userQuizView = new ArrayList<>();
        if(query != null){
            userQuizView = service. getList(query,userId,newOld,page, size);
            UQcount = service.getCount(query,userId);
        }
        else{
            userQuizView = service. getList(userId,newOld,page, size);
            UQcount = service.getCount(userId);
        }

        model.addAttribute("userQuiz", userQuizView);
        model.addAttribute("uqcount", UQcount);

        return "study/userquiz/list";
    }   

    @GetMapping("detail")
    public String detail(Long id
    ,@AuthenticationPrincipal CocoUserDetails userDetails
    ,@RequestParam(name = "category") String cate
    ,Model model) {

        /* OXㅡㅡㅡuser_oxㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ   */
        Long userId=null;
        if(userDetails != null)
        userId=userDetails.getId();

        UserQuizView userQuizView = service.getListById(id, userId, cate);
        int count = 0;

        if(id==null) {
            return "study/userquiz/list";
        }

        model.addAttribute("userQuiz", userQuizView);
                                    
        count = service.getCount(userId);
        model.addAttribute("count", count);

        return "study/userquiz/detail";
    }

    /* 사지선다ㅡㅡㅡuser_multiple_choice_quizㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
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
    
    /* ============================================================================================================ */

    // 유저 문제 등록 페이지
    @GetMapping("reg")
    public String reg() {

        return "study/userquiz/reg";
    }

    @PostMapping("reg")
    public String reg(@RequestParam(name = "cate" ,defaultValue = "multi") String cate
    ,@AuthenticationPrincipal CocoUserDetails userDetails
                        ,@RequestParam(name = "multiAnswer", required = false) Integer multiAnswer
    ,String question, String num1, String num2, String num3, String num4, String answer, String commentary
    
    ){

        Long userId=null;
        if(userDetails != null)
        userId=userDetails.getId();

        if(!cate.equals("multi")){
            service.reg(userId, cate, question, answer, commentary);
            return "redirect:reg";
        }
        if(cate.equals("multi")&& multiAnswer != null){

            service.reg(userId, cate, question, num1, num2, num3, num4, multiAnswer, commentary);
        }
        return "redirect:reg";
    }

    /* ============================================================================================================ */

    //수정페이지
    @GetMapping("edit")
    public String edit(@RequestParam("id") Long id
                        ,@AuthenticationPrincipal CocoUserDetails userDetails
                        ,@RequestParam(name = "category") String cate
                        ,Model model){

        return "study/userquiz/edit";
    }

    //수정
    @PostMapping("edit")
    public String edit(@RequestParam("id") Long id
                        ,@AuthenticationPrincipal CocoUserDetails userDetails
                        ,@RequestParam(name = "cate") String cate
                        ,String question, String num1, String num2, String num3, String num4, String answer, Integer multiAnswer, String commentary
                        ){ 
        
        Long userId=null;
        if(userDetails != null)
        userId=userDetails.getId();

        UserOXQuiz oxQuiz = service.getByOXQuizId(id);
        UserShortQuiz shortQuiz = service.getByShortQuizId(id);
        UserMultipleQuiz multipleQuiz = service.getByMultipleQuizId(id);

        if(cate.equals("ox")){

            oxQuiz.setQuestion(question);
            oxQuiz.setAnswer(answer);
            oxQuiz.setCommentary(commentary);
            service.edit(oxQuiz, userId, id, cate);
        };
        
        if(cate.equals("multi")){
            
            multipleQuiz.setQuestion(question);
            multipleQuiz.setNum1(num1);
            multipleQuiz.setNum2(num2);
            multipleQuiz.setNum3(num3);
            multipleQuiz.setNum4(num4);
            multipleQuiz.setAnswer(multiAnswer);
            multipleQuiz.setCommentary(commentary);
            service.edit(multipleQuiz, userId, id, cate);
        };

        if(cate.equals("short")){
            
            shortQuiz.setQuestion(question);
            shortQuiz.setAnswer(answer);
            shortQuiz.setCommentary(commentary);
            service.edit(shortQuiz, userId, id, cate);
        };

        return "redirect:list";
    }

    //삭제======================================================================================

    @PostMapping("del")
    public String del(@RequestParam(name="id",required = false) Long qID, @RequestParam(name="category",required = false) String category, String items){

        //list의 삭제부분
        if(items!=null){ 

              // JSON 문자열을 JSON 배열로 파싱
              JSONArray jsonArray = new JSONArray(items);

              // 리스트 생성
              List<JSONObject> jsonObjectList = new ArrayList<>();
      
              // JSON 배열을 리스트에 담기
              for (int i = 0; i < jsonArray.length(); i++) {
                  try {
                      JSONObject jsonObject = jsonArray.getJSONObject(i);
                      jsonObjectList.add(jsonObject);
                  } catch (JSONException e) {
                      e.printStackTrace();
                  }
              }
      
              // 리스트 출력
              for (JSONObject jsonObject : jsonObjectList) {

                 String cate = jsonObject.getString("cate");
                 long id = jsonObject.getInt("id");

                service.delById(id, cate);
                }
                return "redirect:list";
         }
        //detail의 삭제 부분
        service.delById(qID, category); 

        return "redirect:list";
    }

    /* TODO 슬라이드!! */
    @GetMapping("slide")
    public String slide(Long id
    ,@AuthenticationPrincipal CocoUserDetails userDetails
    // ,@RequestParam(name = "category") String cate
    ,Model model){

        Long userId=null; //기본값.. 인증한 유저아이디를 받아와요
        if(userDetails != null)
        userId=userDetails.getId();

        // UserQuizView userQuizView = service.getListById(id, userId, cate);

        // model.addAttribute("userQuiz", userQuizView);

        return "study/userquiz/slide";
    }

}

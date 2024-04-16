// package com.quizcoco.web.controller.api;

// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.quizcoco.web.entity.ExamQuiz;
// import com.quizcoco.web.service.ExamQuizService;

// @RequestMapping("api/quizs")
// @RestController("apiSearchController")
// public class SearchController {

//     @Autowired
//     private ExamQuizService service;

//     @GetMapping
//     public List<ExamQuiz> list(
//                        @RequestParam(name = "q",required = false) String query
//                        ,@RequestParam(name = "p",required = false, defaultValue = "1") Integer page
//                        ,@RequestParam(name = "exam-official-rank-id",required = false,defaultValue = "0") Integer examOfficialRankId
//                        ,@RequestParam(name = "type-id",required = false, defaultValue = "0") Integer typeId
//                        ,@RequestParam(required = false,defaultValue = "0") Integer year
//                        ,@RequestParam(required = false) Integer secret
//     ){

//        List<ExamQuiz> examQuizs = new ArrayList<>();

       
//        if(query != null){
//            examQuizs =service.getList(page,query);
//         }
//         else if(secret != null){
//             examQuizs =service.getList(page,secret);
//         }
//         else if(year != null && typeId != null && examOfficialRankId != null){
//             examQuizs =service.getList(page,typeId,year,examOfficialRankId);
//         }
//         else {
//             examQuizs =service.getList(page);
//         }
        
//         return examQuizs;
//     }



//     @GetMapping("rand")
//     public ExamQuiz random(){

//         ExamQuiz random = service.getRand();

       
//         return random;

//     }

    
// }

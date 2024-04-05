package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.entity.ExamQuizView;



public interface ExamQuizService {

    List<ExamQuiz> getList(Integer page);
    // List<ExamQuiz> getList(Integer page, Long categoryId);
    List<ExamQuiz> getList(Integer page, String query);
    // List<MenuView> getList(Integer page, Long categoryId, String query);

    ExamQuiz getById(long id);
    int getCount();
    // int getCount(Long categoryId);
    int getCount(String query);

    
    // List<MenuView> getSearchList(String search);



    void edit(ExamQuiz examQuiz);
    void delById(Long id);
    void reg(ExamQuiz examQuiz);
    
// ==========================랜덤=============================
    List<ExamQuiz> getRand();

    
}

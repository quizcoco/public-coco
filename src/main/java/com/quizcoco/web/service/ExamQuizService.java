package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.ExamQuiz;



public interface ExamQuizService {

    List<ExamQuiz> getList(Integer page);
    List<ExamQuiz> getList(Integer page, Integer secret);
    List<ExamQuiz> getList(Integer page, String query);
    List<ExamQuiz> getList(Integer page, Integer typeId, Integer year, Integer examOfficialRankId);
    List<ExamQuiz> getList(Integer page, String query, Integer typeId, Integer year, Integer examOfficialRankId, Integer secret);

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

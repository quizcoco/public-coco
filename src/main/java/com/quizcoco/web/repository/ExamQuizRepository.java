package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.entity.ExamQuizView;

@Mapper
public interface ExamQuizRepository {


    List<ExamQuiz> findAll(String query, int offset, int size);

    List<ExamQuiz> rand();

    // List<ExamQuiz> findAll(Long typeId, String query, int offset , int size);
    ExamQuiz findById(Long id);
    int count(String query);
    // int count(Long typeId, String query);

    void save(ExamQuiz examQuiz);
    void update(ExamQuiz examQuiz);
    void delete(Long id);

}

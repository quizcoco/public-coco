package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.ExamQuiz;

@Mapper
public interface ExamQuizRepository {


    List<ExamQuiz> findAll(String query,Integer typeId,Integer year,Integer examOfficialRankId,Integer secret, int offset, int size);

    ExamQuiz rand();

    ExamQuiz findById(Long id);
    int count(String query);
    // int count(Long typeId, String query);

    void save(ExamQuiz examQuiz);
    void update(ExamQuiz examQuiz);
    void delete(Long id);
    
    ExamQuiz latest();

}

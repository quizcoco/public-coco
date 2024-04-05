package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.UserOXQuiz;

@Mapper
public interface UserQuizRepository {
    
    List<UserOXQuiz> findAll();
}

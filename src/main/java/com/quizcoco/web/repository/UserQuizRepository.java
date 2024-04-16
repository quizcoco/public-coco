package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserShortQuiz;

@Mapper
public interface UserQuizRepository {
    
    List<UserOXQuiz> findAll();

    UserOXQuiz findByOXId(long id);
    UserShortQuiz findByShortId(long id);
    UserMultipleQuiz findByMultiId(long id);

    void save();

    void saveOX(UserOXQuiz userOXQuiz);
    void saveMulti(UserMultipleQuiz userMultipleQuiz);
    void saveShort(UserShortQuiz userShortQuiz);
}

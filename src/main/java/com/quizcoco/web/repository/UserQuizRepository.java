package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserShortQuiz;

@Mapper
public interface UserQuizRepository {
    
    // List<UserOXQuiz> findAllox(String query, long userId,Integer offset,Integer size );
    List<UserQuizView> findAll(String query, long userId,Integer newOld, Integer offset,Integer size );
    UserQuizView findAllById(Long id, long userId, String cate);

    int count(String query,long userId);
    
    UserOXQuiz findByOXId(long id);
    UserShortQuiz findByShortId(long id);
    UserMultipleQuiz findByMultiId(long id);

    void saveOX(long userId,String cate, String question, String answer, String commentary);
    void saveMulti(long userId, String cate, String question, String num1, String num2, String num3, String num4, Integer answer, String commentary);

    void saveOX(UserOXQuiz userOXQuiz);
    void saveMulti(UserMultipleQuiz userMultipleQuiz);
    void saveShort(UserShortQuiz userShortQuiz);

    void deleteById(Long id, String cate);

    void updateOX(@Param("userquiz") UserOXQuiz userOXQuiz,long userId, Long id, String cate);
    void updateMulti(@Param("usermultiquiz") UserMultipleQuiz userMultipleQuiz,long userId, Long id, String cate);
}

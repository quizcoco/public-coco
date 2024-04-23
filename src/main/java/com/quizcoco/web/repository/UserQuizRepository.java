package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserShortQuiz;

@Mapper
public interface UserQuizRepository {
    
    // List<UserOXQuiz> findAllox(String query, long userId,Integer offset,Integer size );
    List<UserQuizView> findAll(String query, long userId,Integer newOld, Integer offset,Integer size );
    UserQuizView findAllById(Long id, long userId, String cate);

    int count(String query);
    
    UserOXQuiz findByOXId(long id);
    UserShortQuiz findByShortId(long id);
    UserMultipleQuiz findByMultiId(long id);

    void save();

    void saveOX(UserOXQuiz userOXQuiz);
    void saveMulti(UserMultipleQuiz userMultipleQuiz);
    void saveShort(UserShortQuiz userShortQuiz);

    void delete(Long id, String cate);

}

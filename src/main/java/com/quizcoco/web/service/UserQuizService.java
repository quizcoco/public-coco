package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserShortQuiz;

public interface UserQuizService {

    // List<UserOXQuiz> getOXList(String query, long userId,Integer page,Integer size);
    // List<UserOXQuiz> getOXList(long userId,Integer page,Integer size);

    List<UserQuizView> getList(String query, long userId,Integer page,Integer size);
    List<UserQuizView> getList(long userId,Integer page,Integer size);
    UserQuizView getListById(long id,String cate);

    int getCount();
    int getCount(String query);

    UserOXQuiz getByOXQuizId(long id);
    UserShortQuiz getByShortQuizId(long id);
    UserMultipleQuiz getByMultipleQuizId(long id);

    void reg();
    void regOX(UserOXQuiz userOXQuiz);
    void regMulti(UserMultipleQuiz userMultipleQuiz);
    void regShort(UserShortQuiz userShortQuiz);
    
}

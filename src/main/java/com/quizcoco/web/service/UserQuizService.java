package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserShortQuiz;

public interface UserQuizService {

    List<UserOXQuiz> getList(long userId);
    
    UserOXQuiz getByOXQuizId(long id);
    UserShortQuiz getByShortQuizId(long id);
    UserMultipleQuiz getByMultipleQuizId(long id);

    void reg();
    void regOX(UserOXQuiz userOXQuiz);
    void regMulti(UserMultipleQuiz userMultipleQuiz);
    void regShort(UserShortQuiz userShortQuiz);
    
}

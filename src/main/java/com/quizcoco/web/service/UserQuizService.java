package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserShortQuiz;

public interface UserQuizService {

    // List<UserOXQuiz> getOXList(String query, long userId,Integer page,Integer size);
    // List<UserOXQuiz> getOXList(long userId,Integer page,Integer size);
    List<UserQuizView> getList(String query, long userId,Integer newOld, Integer page,Integer size);
    List<UserQuizView> getList(long userId,Integer newOld, Integer page,Integer size);
    UserQuizView getListById(long id, long userId, String cate);

    List<UserQuizView> getOne(long userId,Integer newOld, Integer page);



    int getCount(); //TODO 유저아이디 추가
    int getCount(String query);

    UserOXQuiz getByOXQuizId(long id);
    UserShortQuiz getByShortQuizId(long id);
    UserMultipleQuiz getByMultipleQuizId(long id);

    void reg(long userId,String cate, String question, String answer, String commentary);
    void reg(long userId, String cate, String question, String num1, String num2, String num3, String num4, Integer answer, String commentary);

    void regOX(UserOXQuiz userOXQuiz);
    void regMulti(UserMultipleQuiz userMultipleQuiz);
    void regShort(UserShortQuiz userShortQuiz);

    void delById(Long id, String cate);
    
    void edit(UserOXQuiz userOXQuiz,long userId, Long id, String cate);
    void edit(UserMultipleQuiz userMultipleQuiz,long userId, Long id,  String cate);


}
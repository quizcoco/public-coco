package com.quizcoco.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserShortQuiz;
import com.quizcoco.web.repository.UserQuizRepository;

@Service
public class UserQuizServiceImp implements UserQuizService{

    @Autowired
    private UserQuizRepository repository;
    
    //===============================getList====================================    

    @Override
    public UserQuizView getListById(long id, long userId, String cate) {
        return repository.findAllById(id, userId, cate);

    }
    
    @Override
    public List<UserQuizView> getList(long userId, Integer newOld,  Integer page, Integer size) {
        System.out.println("=========================여기는 서비스"+size);
       return getList(null,userId, newOld, page, size);
    }

    @Override
    public List<UserQuizView> getList(String query, long userId, Integer newOld, Integer page,Integer size) {
        
        // int size=10; //~개씩
        int offset=(page-1)*size; //부터
        //1-0 :10 / 2-10 / 3-20 / 4-30 / 5-40  
        
        List<UserQuizView> list = repository.findAll(query, userId, newOld, offset, size);

        return list;
    }

//============================하나만========================================


    @Override
    public List<UserQuizView> getOne(long userId, Integer newOld, Integer page) {
         // int size=10; //~개씩
         int offset=(page-1); //부터
         //1-0 :10 / 2-10 / 3-20 / 4-30 / 5-40  
         
         List<UserQuizView> list = repository.findAll(null, userId, newOld, offset,1);
 
         return list;
    }



//====================================getById===================================

    @Override
    public UserOXQuiz getByOXQuizId(long id) {
        
        return repository.findByOXId(id);

    }

    @Override
    public UserShortQuiz getByShortQuizId(long id) {

        return repository.findByShortId(id);

    }

    @Override
    public UserMultipleQuiz getByMultipleQuizId(long id) {

        return repository.findByMultiId(id);

    }

//====================================reg========================================

    // @Override
    // public void reg() {
    //     repository.save();
    // }

    @Override
    public void regOX(UserOXQuiz userOXQuiz) {
        repository.saveOX(userOXQuiz);
    }

    @Override
    public void regMulti(UserMultipleQuiz userMultipleQuiz) {
        repository.saveMulti(userMultipleQuiz);
    }

    @Override
    public void regShort(UserShortQuiz userShortQuiz) {
        repository.saveShort(userShortQuiz);
    }

    @Override
    public int getCount(long userId) {
      return getCount(null,userId);
    }

    @Override
    public int getCount(String query,long userId) {
       return repository.count(query,userId);
    }

    @Override
    public void delById(Long id, String cate) {
       repository.deleteById(id, cate);
    }

    @Override
    public void reg(long userId, String cate, String question, String answer, String commentary) {
        repository.saveOX(userId, cate, question, answer, commentary);
    }

    @Override
    public void reg(long userId, String cate, String question, String num1, String num2, String num3, String num4, Integer answer,String commentary) {
         repository.saveMulti(userId, cate, question, num1, num2, num3, num4, answer, commentary);
    }

    @Override
    public void edit(UserOXQuiz userOXQuiz,long userId, Long id,  String cate) {
        repository.updateOX(userOXQuiz, userId, id, cate);
    }

    @Override
    public void edit(UserMultipleQuiz userMultipleQuiz,long userId, Long id,  String cate) {
        repository.updateMulti( userMultipleQuiz,userId, id, cate);
    }

    @Override
    public void edit(UserShortQuiz UserShortQuiz, long userId, Long id, String cate) {
        repository.updateShort(UserShortQuiz, userId, id, cate);
    }

   

}

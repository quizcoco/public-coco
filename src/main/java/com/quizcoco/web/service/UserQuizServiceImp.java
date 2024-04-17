package com.quizcoco.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.UserMultipleQuiz;
import com.quizcoco.web.entity.UserOXQuiz;
import com.quizcoco.web.entity.UserShortQuiz;
import com.quizcoco.web.repository.UserQuizRepository;

@Service
public class UserQuizServiceImp implements UserQuizService{

    @Autowired
    private UserQuizRepository repository;

//====================================getList===================================    
    @Override
    public List<UserOXQuiz> getList(long userId) {

        List<UserOXQuiz> list = repository.findAll(userId);

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

//====================================reg===================================    
    @Override
    public void reg() {
        repository.save();
    }

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
    
}

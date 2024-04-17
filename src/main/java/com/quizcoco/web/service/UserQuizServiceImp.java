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

    @Override
    public List<UserOXQuiz> getList(long userId) {

        List<UserOXQuiz> list = repository.findAll(userId);

        return list;
    }

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
    
}

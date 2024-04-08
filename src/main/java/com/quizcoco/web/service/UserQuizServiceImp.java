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
    public List<UserOXQuiz> getList() {

        List<UserOXQuiz> list = repository.findAll();

        return list;
    }

    @Override
    public UserOXQuiz getOXQuizById(long id) {
        
        return repository.findByOXId(id);

    }

    @Override
    public UserShortQuiz getShortQuizById(long id) {

        return repository.findByShortId(id);

    }

    @Override
    public UserMultipleQuiz getMultipleQuizById(long id) {

        return repository.findByMultiId(id);

    }
    
}

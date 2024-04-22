package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.UserQuizzesFavorite;
import com.quizcoco.web.repository.UserQuizzesFavoriteRepository;

@Service
public class UserQuizzesFavoriteServiceImp implements UserQuizzesFavoriteService {
    
    @Autowired
    private UserQuizzesFavoriteRepository repository;

    @Override
    public UserQuizzesFavorite add(UserQuizzesFavorite favorite) {
        int reslut = repository.save(favorite);
        return favorite;
    }

    @Override
    public String cancel(UserQuizzesFavorite favorite) {
        return null;
    }

}



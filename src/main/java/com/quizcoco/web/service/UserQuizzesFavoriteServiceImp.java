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
    public boolean add(UserQuizzesFavorite favorite) {
        repository.save(favorite);

        boolean isfavorite = repository.isFavorite(favorite);
        return isfavorite;
    }

    public boolean isFavorite(UserQuizzesFavorite favorite) {

        boolean isfavorite = repository.isFavorite(favorite);
        return isfavorite;
    }



    @Override
    public String cancel(UserQuizzesFavorite favorite) {
        return null;
    }

}



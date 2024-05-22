package com.quizcoco.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.UserQuizView;
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
    public boolean cancel(UserQuizzesFavorite favorite) {

            repository.delete(favorite);
            boolean isfavorite = repository.isFavorite(favorite);

        return isfavorite;
    }

    @Override
    public List<UserQuizView> getList(Long userId, Integer size) {

        List<UserQuizView> list = repository.getFavoritesByUserId(userId, size);
       return  list;
    }

    @Override
    public int getCount(long userId) {

        int count = repository.count(userId);
       return count;
    }
}



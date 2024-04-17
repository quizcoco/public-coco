package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.User;
import com.quizcoco.web.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {
    
    @Autowired
    private UserRepository repository;

    @Override
    public User getByUserId(Long id) {
       
        return repository.findByUserId(id);
    }


}
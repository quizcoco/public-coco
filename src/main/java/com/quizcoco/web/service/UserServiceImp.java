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
    public User getByUserName(String username) {
       
        return repository.findByUserName(username);
    }

    @Override
    public boolean validate(String username, String password) {
      
        User user = repository.findByUserName(username);

        if(user == null)
            return false;
        
        if(!user.getPw().equals(password))
            return false;

            return true;
        }


}

package com.quizcoco.web.service;

import com.quizcoco.web.entity.User;

public interface UserService {
    
    User getByUserName(String username);

    boolean validate(String username, String password);
}
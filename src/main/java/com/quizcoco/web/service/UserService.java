package com.quizcoco.web.service;

import com.quizcoco.web.entity.User;

public interface UserService {
    
    User getByUserId(Long id);
}


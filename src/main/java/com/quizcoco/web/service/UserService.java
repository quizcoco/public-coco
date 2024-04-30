package com.quizcoco.web.service;

import com.quizcoco.web.entity.User;

public interface UserService {
    
    User getByUserName(String username);


    void sign(User user);

    int mailCheck(String mail) throws Exception;
    int nameCheck(String username) throws Exception;
    int nickCheck(String nickname) throws Exception;

}

package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.User;

@Mapper
public interface UserRepository {

    User findByUserName(String username);
    User findByEmail(String email);

    void save(User user);

    int mailCheck(String mail);
    int nameCheck(String username);
    int nickCheck(String nickname);
 
}

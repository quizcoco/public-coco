package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.User;

@Mapper
public interface UserRepository {

    User findByUserName(String name);
 
}
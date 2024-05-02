package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.User;

@Mapper
public interface RankingRepository {

    List<User> findAllByOrderByPoint();
    
}

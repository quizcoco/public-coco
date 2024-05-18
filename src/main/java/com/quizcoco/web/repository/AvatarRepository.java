package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.quizcoco.web.entity.Avatar;

@Mapper
public interface AvatarRepository {

    Avatar findAvatarByUserId(Long userId);

    void save(Avatar avatar);
    void update(Long userId,@Param("avatar") Avatar avatar);
   
}

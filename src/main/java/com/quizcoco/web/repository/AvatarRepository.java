package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.Avatar;

@Mapper
public interface AvatarRepository {

    Avatar findAvatarByUserId(Long useredId);
   
}

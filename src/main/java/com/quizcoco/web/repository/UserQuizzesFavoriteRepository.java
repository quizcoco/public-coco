package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.UserQuizzesFavorite;

@Mapper
public interface UserQuizzesFavoriteRepository {

int save(UserQuizzesFavorite favorite);
int delete(UserQuizzesFavorite favorite);

}

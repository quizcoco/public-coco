package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserQuizzesFavorite;

@Mapper
public interface UserQuizzesFavoriteRepository {

    int save(UserQuizzesFavorite favorite);
    int delete(UserQuizzesFavorite favorite);

    boolean isFavorite(UserQuizzesFavorite favorite);

    List<UserQuizView> getFavoritesByUserId(Long userId, Integer size);

    int count(long userId);
}

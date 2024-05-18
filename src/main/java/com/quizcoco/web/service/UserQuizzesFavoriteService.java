package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.UserQuizView;
import com.quizcoco.web.entity.UserQuizzesFavorite;


public interface UserQuizzesFavoriteService {

    // UserQuizzesFavorite add(UserQuizzesFavorite favorite); //좋아요 추가 //사용자(화면) -> 컨트롤러(메소드-페이지명(좋아() 좋아요를 추가해줘))->서비스(메소드)->레파지토리(메소드)
    boolean cancel(UserQuizzesFavorite favorite); //좋아요 취소

    boolean add(UserQuizzesFavorite favorite);

    boolean isFavorite(UserQuizzesFavorite favorite);

    List<UserQuizView> getList(Long userId, Integer newOld, Integer page, Integer size);

    int getCount(long userId);
}
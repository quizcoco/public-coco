package com.quizcoco.web.service;

import com.quizcoco.web.entity.UserQuizzesFavorite;


public interface UserQuizzesFavoriteService {

    UserQuizzesFavorite add(UserQuizzesFavorite favorite); //좋아요 추가 //사용자(화면) -> 컨트롤러(메소드-페이지명(좋아() 좋아요를 추가해줘))->서비스(메소드)->레파지토리(메소드)
    String cancel(UserQuizzesFavorite favorite); //좋아요 취소

    
}
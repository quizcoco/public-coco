package com.quizcoco.web.repository;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.User;

@Mapper
public interface UserRepository {

   //User findByUserName(String username);
   Optional<User>findByUserName(String username);
   
    User findByUserId(Long id);
    User findByEmail(String email);

    void save(User user);
    void update(User user);

    //아이디, 메일 중복 확인
    int usernameExists(String username);
    int mailExists(String mail);

    
     // 유저 프로필 업데이트
     void updateUser(User user);
    
    // 닉네임, 메세지 중복 확인
    int nicknameExists(String nickname);
    int messageExists(String message);

    // 유저 정보(경험치, 레벨, 포인트) 가져오기
    int findExpByUserId(Long useredId);
    int findLevelByUserId(Long useredId);
    int findPointByUserId(Long useredId); 
}

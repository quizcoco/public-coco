package com.quizcoco.web.service;

import com.quizcoco.web.entity.User;

public interface UserService {
    
    User getByUserName(String username);
    User getByUserId(Long userId);

    void editUser(User user);
    void sign(User user);

    int mailCheck(String mail) throws Exception;
    int nameCheck(String username) throws Exception;
    int nickCheck(String nickname) throws Exception;

    void updateUser(User user);

    boolean nicknameExists(String nickname);
    boolean messageExists(String message);

    int getUserExp(Long useredId);
    int getUserLevel(Long useredId);
    int getUserPoint(Long useredId);

}

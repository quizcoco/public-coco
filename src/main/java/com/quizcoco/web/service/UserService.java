package com.quizcoco.web.service;

import com.quizcoco.web.entity.User;

public interface UserService {
    
    User getByUserName(String username);
    User getByUserId(Long userId);

    void editUser(User user);
    void sign(User user);

    boolean usernameExists(String username);
    boolean mailExists(String mail);

    void updateUser(User user);

    boolean nicknameExists(String nickname);
    boolean messageExists(String message);

    int getUserExp(Long useredId);
    int getUserLevel(Long useredId);
    int getUserPoint(Long useredId);

}

package com.quizcoco.web.service;

import com.quizcoco.web.entity.Avatar;

public interface AvatarService {
    
    Avatar getAvatarByUserId(Long userId);

    void regAvatar(Long userId);

    void editAvatar(Long userId, Avatar avatar);
    
}

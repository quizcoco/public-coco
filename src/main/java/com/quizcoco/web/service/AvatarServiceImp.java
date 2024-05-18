package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Avatar;
import com.quizcoco.web.repository.AvatarRepository;

@Service
public class AvatarServiceImp implements AvatarService {

    @Autowired
    private AvatarRepository repository;

    @Override
    public Avatar getAvatarByUserId(Long useredId) {
       
        Avatar avatar = repository.findAvatarByUserId(useredId);
        if (avatar != null) {

            return avatar;
            
        } else {
            return null;
        }
    }

    @Override //아바타 생성
    public void regAvatar(Long userId) {
       
               
        Avatar avatar = new Avatar();
        avatar.setUserId(userId);
        repository.save(avatar);
    }

    @Override
    public void editAvatar(Long userId,Avatar avatar) {
      
        repository.update(userId, avatar);
    }



    
    
}

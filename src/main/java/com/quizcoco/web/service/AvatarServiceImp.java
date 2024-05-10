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
    public String getAvatarByUserId(Long useredId) {
       
        Avatar avatar = repository.findAvatarByUserId(useredId);
        if (avatar != null) {

            return avatar.getImg();
            
        } else {
            return null;
        }
    }
    
}

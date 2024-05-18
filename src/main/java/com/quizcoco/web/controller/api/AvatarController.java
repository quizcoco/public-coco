package com.quizcoco.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.Avatar;
import com.quizcoco.web.service.AvatarService;



@RequestMapping("api/avatar")
@RestController
public class AvatarController {

    @Autowired
    private AvatarService service;



    @GetMapping("detail")
    public Avatar detail(@AuthenticationPrincipal CocoUserDetails userDetails) {

        Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();

        Avatar avatar = service.getAvatarByUserId(userId);

        return avatar;
    }
    



    @PutMapping("edit")//아바타 정보수정
    public void makeAvatar(Integer gender, @AuthenticationPrincipal CocoUserDetails userDetails) {

        System.out.println("아바타성별~~"+gender);

        Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();

            Avatar avatar=  service.getAvatarByUserId(userId);

            avatar.setGender(gender);

            service.editAvatar(userId, avatar);

    } 
}

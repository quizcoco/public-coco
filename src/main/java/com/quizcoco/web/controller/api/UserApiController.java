package com.quizcoco.web.controller.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.Coco;
import com.quizcoco.web.entity.User;
import com.quizcoco.web.service.UserService;


@RestController("apiUserController")
@RequestMapping("api/users")
public class UserApiController {
    
    @Autowired
    private UserService service;

    @PostMapping
    public User sign(User user) throws Exception {

        if (service.mailCheck(user.getMail()) > 0) {
            throw new RuntimeException("사용중인 이메일입니다.");
        }

        if (service.nameCheck(user.getUserName()) > 0) {
            throw new RuntimeException("사용중인 아이디입니다.");
        }

        if (service.nickCheck(user.getNickName()) > 0) {
            throw new RuntimeException("사용중인 닉네임입니다.");
        }

        return null;
    }


    @GetMapping("info")
    public User myInfo(@AuthenticationPrincipal CocoUserDetails userDetails) {


        Long userId = null;

        User user = new User();

        if(userDetails != null){
            user.setLevel(userDetails.getLevel());
            user.setNickName(userDetails.getNickname());
            user.setExp(userDetails.getExp());
            user.setPoint(userDetails.getPoint());
            user.setImg(userDetails.getImg());
            user.setMessage(userDetails.getMessage());

        }
        return user;
    }
    

      @PutMapping("edit")//포인트 더하기
    public void editUser(@RequestBody Map<String, Integer> body, @AuthenticationPrincipal CocoUserDetails userDetails) {
        Integer point = body.get("point");
        System.out.println("얻은 포인트~~"+point);
        
        Long userId=null;
        if(userDetails != null)
        userId=userDetails.getId();
        
        Integer pointSum = userDetails.getPoint()+point;
        System.out.println("유저아이디~~"+userId);

            User user = service.getByUserId(userId);

            user.setPoint(pointSum);

            service.editUser(user);

    } 

}
 
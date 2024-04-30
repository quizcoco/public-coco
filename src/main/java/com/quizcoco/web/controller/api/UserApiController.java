package com.quizcoco.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
 
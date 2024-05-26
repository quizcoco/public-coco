package com.quizcoco.web.controller.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

   //회원 가입 시 아이디 중복 확인
   @GetMapping("checkUserName")
   public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
       boolean exists = service.usernameExists(username);
       return ResponseEntity.ok(exists);
   }

   //회원 가입 시 이메일 중복 확인
   @GetMapping("checkMail")
   public ResponseEntity<Boolean> checkMail(@RequestParam String mail) {
       boolean exists = service.mailExists(mail);
       return ResponseEntity.ok(exists);
   }
   
     //회원 정보 중 닉네임 중복 확인
    @GetMapping("checkNickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        boolean exists = service.nicknameExists(nickname);
        return ResponseEntity.ok(exists);
    }

    //회원 정보 중 메세지 확인
    @GetMapping("checkMessage")
    public ResponseEntity<Boolean> checkMessage(@RequestParam String message) {
        boolean exists = service.messageExists(message);
        return ResponseEntity.ok(exists);
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
    

      @PutMapping("edit")//포인트,exp 더하기 ... 경험치도 해야할듯....
    public void editUser(@RequestBody Map<String, Integer> body, @AuthenticationPrincipal CocoUserDetails userDetails) {
        Integer point = body.get("point");
        Integer exp = body.get("point");
        System.out.println("얻은 포인트~~"+point);
        System.out.println("얻은 경험치~~"+exp);
        
        Long userId=null;
        if(userDetails != null)
        userId=userDetails.getId();
        
        System.out.println("userDetails.getPoint()~~"+userDetails.getPoint());
        Integer pointSum = userDetails.getPoint()+point;
        Integer expSum = userDetails.getExp()+exp;
        System.out.println("유저아이디~~"+userId);

            User user = service.getByUserId(userId);

            user.setPoint(pointSum);
            user.setExp(expSum);


            service.editUser(user);

    } 

}
 
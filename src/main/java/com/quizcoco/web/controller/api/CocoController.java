package com.quizcoco.web.controller.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.Avatar;
import com.quizcoco.web.entity.Coco;
import com.quizcoco.web.service.CocoService;

@RequestMapping("api/cocos")
@RestController("apiCocoController")
public class CocoController {

    @Autowired
    CocoService service;
    
    @GetMapping("detail")
    public Coco getCoco(@AuthenticationPrincipal CocoUserDetails userDetails){


         Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();
        
        Coco coco = service.getCocoByUserId(userId);
        return coco;


    }


     @PutMapping("edit")//코코 정보수정
    public void editCoco(@RequestBody Map<String, String> body, @AuthenticationPrincipal CocoUserDetails userDetails) {
        String name = body.get("name");
        System.out.println("코코 이름~~"+name);

        Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();

            Coco coco = service.getCocoByUserId(userId);

            coco.setName(name);

            service.editCoco(userId, coco);

    } 
    
}

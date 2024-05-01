package com.quizcoco.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.Coco;
import com.quizcoco.web.service.CocoService;

@RequestMapping("api/coco")
@RestController
public class CocoController {

    @Autowired
    CocoService service;
    
    @GetMapping("detail")
    public Coco getCoco(@AuthenticationPrincipal CocoUserDetails userDetails){


         Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();


        Coco coco = service.getCocoById(1);//TODO
        return coco;
    }
    
}

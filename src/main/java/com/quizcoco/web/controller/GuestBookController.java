package com.quizcoco.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.GuestBook;
import com.quizcoco.web.entity.User;
import com.quizcoco.web.service.GuestBookService;
import com.quizcoco.web.service.UserService;

@Controller
@RequestMapping("bbs")
public class GuestBookController {

    @Autowired
    private UserService userService;

    @Autowired
    private GuestBookService gbService;
    

    @GetMapping("{username}")
    public String getGuestBook(@PathVariable String username
                            ,@RequestParam(name="p", defaultValue = "1") Integer page
                            ,@RequestParam(name="s", required = false, defaultValue = "15") Integer size
                            , Model model){
        
        User user = new User();
        
        try {
            user = userService.getByUserName(username);
            model.addAttribute("pageTitle", user.getNickName()+"의 방명록");
            
        } catch (UsernameNotFoundException e) {
            model.addAttribute("pageTitle", "404");
            model.addAttribute("errorMessage", e.getMessage());
            return "error/404";
        }

        List<GuestBook> list = new ArrayList<>();
        list = gbService.getListByUserId(user.getId(), page, size);
        model.addAttribute("list", list);
 
        return "bbs/index";
    }

    @PostMapping("{username}")
    public String reg(GuestBook guestBook
                        ,@PathVariable String username
                        ,@AuthenticationPrincipal CocoUserDetails userDetails) {


        Long userId = null; 
        if(userDetails != null)
            userId=userDetails.getId();

            guestBook.setUserId(userService.getByUserName(username).getId());// 방명록 주인 아이디
            guestBook.setWriterId(userId);//글쓴이 아이디

        gbService.add(guestBook);




        return "redirect:{username}";
    }
    




}

package com.quizcoco.web.controller.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.service.PostLikeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("api/post-likes")
public class PostLikeController {

    @Autowired
    private PostLikeService postLikeService;

    @PostMapping("like")
    public ResponseEntity<Boolean> likePost(@RequestBody Long postId
                        ,@AuthenticationPrincipal CocoUserDetails userDetails) {
        
            Long userId=null;
            if(userDetails != null)
                userId=userDetails.getId();

            try {
                boolean likeSuccess =  postLikeService.likePost(postId,userId);
                return ResponseEntity.ok(likeSuccess);
            } 
            catch (DataIntegrityViolationException e) { // 중복된 postId, userId 에 대한 처리
                return ResponseEntity.badRequest().body(false);
            }    
    }

    @PostMapping("unlike")
    public ResponseEntity<Boolean> unlikePost(@RequestBody Long postId
                        ,@AuthenticationPrincipal CocoUserDetails userDetails) {

        Long userId=null;
        if(userDetails != null)
            userId=userDetails.getId();

        boolean unlikeSuccess =  postLikeService.unlikePost(postId,userId);

        if(unlikeSuccess)
            return ResponseEntity.ok(unlikeSuccess);

        return ResponseEntity.badRequest().body(false);


    }


    
    @GetMapping("countLikes")
    public Integer countLikes(@RequestParam(name = "id") Long postId) {

        return postLikeService.getLikesCount(postId);
    }
    


}

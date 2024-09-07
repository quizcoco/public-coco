package com.quizcoco.web.controller.api;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.entity.Board;
import com.quizcoco.web.entity.Comment;
import com.quizcoco.web.service.BoardService;
import com.quizcoco.web.service.CommentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RequestMapping("api/comments")
@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private BoardService boardService;

    private AtomicInteger anonymousCounter = new AtomicInteger(1);


    @GetMapping("list")
    public List<Comment> cmtList(@RequestParam(name = "id",required = false) Long postId) {

        List<Comment> list = commentService.getList(postId);

        return list;
    }
    

    @PostMapping("reg")
    public void regCmt(@RequestBody Map<String, String> body, @AuthenticationPrincipal CocoUserDetails userDetails) {

        String comment = body.get("comment");
        Long postId = Long.parseLong(body.get("postId"));

        //포스트게시자 아이디
        Board board = boardService.getById(postId);
        Long postUserId = board.getUserId();

        
        Long userId=null;
        if(userDetails != null)
            userId = userDetails.getId();
        final Long finalUserId = userId;    

        //이전에 글 쓴적 있는지
        List<Comment> comments= commentService.getList(postId);
        Comment previousComment = comments.stream().filter(c->c.getUserId().equals(finalUserId))
                                            .findFirst().orElse(null);
            
        //가장 큰 익명숫자                                    
        Integer maxAnonymousNum = comments.stream()
                                        .filter(c -> c.getAnonymousNum() != null)
                                        .mapToInt(Comment::getAnonymousNum)
                                        .max()
                                        .orElse(0);

        //익명게시자 셋팅
        Comment cmt = new Comment();
        if(postUserId != userId){

            if(previousComment == null)
                cmt.setAnonymousNum(maxAnonymousNum + 1);
            else
                cmt.setAnonymousNum(previousComment.getAnonymousNum());
        }
        
        cmt.setUserId(userId);
        cmt.setComment(comment);
        cmt.setPostId(postId);

        commentService.regCmt(cmt);

    }

    @PreAuthorize("isAuthenticated() and @commentServiceImp.isOwner(T(java.lang.Long).parseLong(#body['cmtId']))") //인가처리
    @PostMapping("edit")
    public void editCmt(@RequestBody Map<String, String> body) {

        String editedCmt = body.get("comment");
        Long cmtId = Long.parseLong(body.get("cmtId"));

        Comment cmt = commentService.getById(cmtId); //기존

        cmt.setComment(editedCmt);

        commentService.editCmt(cmt);

    }
    

    @PreAuthorize("isAuthenticated() and @commentServiceImp.isOwner(T(java.lang.Long).parseLong(#body['cmtId']))") //인가처리
    @PostMapping("del")
    public ResponseEntity<Boolean> delCmt(@RequestBody Map<String, String> body) {

        Long cmtId = Long.parseLong(body.get("cmtId"));

        boolean isSuccess = commentService.delCmt(cmtId);

        if (isSuccess) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }
    
    
    
}

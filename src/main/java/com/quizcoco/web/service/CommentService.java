package com.quizcoco.web.service;

import java.util.List;
import java.util.Map;

import com.quizcoco.web.entity.Comment;

public interface CommentService {

    List<Comment> getList(Long postId);
    Comment getById(Long id);
    Map<Long,Long> getCmtCount();

    void regCmt(Comment comment);
    void editCmt(Comment comment);
    boolean delCmt(Long id);
    
}

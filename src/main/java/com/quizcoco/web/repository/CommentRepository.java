package com.quizcoco.web.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.Comment;

@Mapper
public interface CommentRepository {

void insert(Comment comment);

List<Comment> findAllByPostId(Long postId);

Comment findByCmtId(Long id);

List<Map<String, Object>> countCmt();

void update(Comment comment);
int delete(Long id);


}

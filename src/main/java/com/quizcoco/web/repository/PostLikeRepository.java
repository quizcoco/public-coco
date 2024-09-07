package com.quizcoco.web.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostLikeRepository {

    int saveLike(Long postId, Long userId);

    int deleteLike(Long postId, Long userId);

    Integer countLikesByPostId(Long postId);

    List<Map<String, Object>> countLikes();
    
}

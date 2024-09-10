package com.quizcoco.web.service;

import java.util.Map;

import com.quizcoco.web.entity.UserQuizzesFavorite;

public interface PostLikeService {

    boolean likePost(Long postId, Long userId);

    boolean unlikePost(Long postId, Long userId);

    boolean hasUserLiked(Long postId, Long userId);


    Integer getLikesCount(Long postId);

    Map<Long,Long> getLikesCountMap();

    
}

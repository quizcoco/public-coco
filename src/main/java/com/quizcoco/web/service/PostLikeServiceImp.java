package com.quizcoco.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.repository.PostLikeRepository;

@Service
public class PostLikeServiceImp implements PostLikeService{

    @Autowired
    private PostLikeRepository repository;

    @Override
    public boolean likePost(Long postId, Long userId) {
         int affected = repository.saveLike(postId, userId);
          
         if(affected>0)
            return true;
        return false; 
    }

    @Override
    public boolean unlikePost(Long postId, Long userId) {
        int affected = repository.deleteLike(postId, userId);
        if(affected>0)
            return true;
        return false; 
    }

    @Override
    public Integer getLikesCount(Long postId) {
        return repository.countLikesByPostId(postId);
    }

    @Override
    public Map<Long, Long> getLikesCountMap() {
       

        List<Map<String, Object>> countDatas = repository.countLikes();

      Map<Long, Long> result = new HashMap<>();
      for(Map<String, Object> data : countDatas){
         Long postId = ((Number)data.get("postId")).longValue();
         Long count = ((Number)data.get("count")).longValue();

         result.put(postId,count);
      }
      return result;
    }
    
}

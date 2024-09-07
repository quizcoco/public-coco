package com.quizcoco.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Board;
import com.quizcoco.web.entity.Comment;
import com.quizcoco.web.repository.CommentRepository;

@Service
public class CommentServiceImp implements CommentService{


    @Autowired
    private CommentRepository repository;

    @Autowired
    private UserService userService;

    @Override
    public void regCmt(Comment comment) {
       repository.insert(comment);
    }

    @Override
    public List<Comment> getList(Long postId) {
       return repository.findAllByPostId(postId);
    }
    
    @Override
    public Comment getById(Long id) {

       return repository.findByCmtId(id);
    }

    @Override
   public Map<Long,Long> getCmtCount() {

      List<Map<String, Object>> countDatas = repository.countCmt();

      Map<Long, Long> result = new HashMap<>();
      for(Map<String, Object> data : countDatas){
         Long postId = ((Number)data.get("postId")).longValue();
         Long count = ((Number)data.get("count")).longValue();

         result.put(postId,count);
      }
      return result;
   }

    //인가 처리
   public boolean isOwner(Long cmtId){

   Comment cmt = getById(cmtId);

   Long userId = cmt.getUserId(); //작성자
   Long currentUserId = userService.getCurrentUserId(); //현재 사용자

   //작성자와 현재 사용자 비교
   if(!userId.equals(currentUserId)){
      throw new AccessDeniedException("댓글 권한이 없습니다.");
   }
   return userId.equals(currentUserId);

  }


  @Override
  public void editCmt(Comment comment) {
     repository.update(comment);
  }



   @Override
   public boolean delCmt(Long id) {

      int value = repository.delete(id);
      boolean result = false;
      if(value > 0){
         result =true;
         return result;
      }

      return result;


   }
    
}

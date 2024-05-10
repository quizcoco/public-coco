package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Coco;
import com.quizcoco.web.repository.CocoRepository;

@Service
public class CocoServiceImp implements CocoService{

    @Autowired
    CocoRepository repository;

    @Override
    public Coco getCocoById(long userId) {
      return repository.findCocoById(userId);
    }

    @Override
    public String getCocoImgUrl(Long useredId) {
      
      Coco coco = repository.findCocoByUserId(useredId);

      if (coco != null) {

        return coco.getImg();
      
      } else {
          return null;
      } 
      
    }
    
}

package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Avatar;
import com.quizcoco.web.entity.Coco;
import com.quizcoco.web.repository.CocoRepository;

@Service
public class CocoServiceImp implements CocoService{

    @Autowired
    CocoRepository repository;

    @Override
    public Coco getCocoByUserId(long userId) {
      return repository.findCocoByUserId(userId);
    }

    @Override
    public String getCocoImgUrl(Long userId) {
      
      Coco coco = repository.findCocoImgByUserId(userId);

      if (coco != null) {

        return coco.getImg();
      
      } else {
          return null;
      } 
      
    }

    @Override
    public void editCoco(Long userId, Coco coco) {
        repository.update(userId, coco);
    }

    @Override
    public void regCoco(Long userId) {
              
        Coco coco = new Coco();
        coco.setUserId(userId);
        repository.save(coco);
    }
    
}

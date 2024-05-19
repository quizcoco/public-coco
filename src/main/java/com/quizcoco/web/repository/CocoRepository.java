package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.quizcoco.web.entity.Avatar;
import com.quizcoco.web.entity.Coco;

@Mapper
public interface CocoRepository {

    Coco findCocoByUserId(long userId);

    Coco findCocoImgByUserId(Long userId);

    void save(Coco coco);
    void update(long userId,@Param("coco") Coco coco);
    
}

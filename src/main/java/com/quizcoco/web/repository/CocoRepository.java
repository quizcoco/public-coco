package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.Coco;

@Mapper
public interface CocoRepository {

    Coco findCocoById(long userId);

    Coco findCocoByUserId(Long useredId);
    
}

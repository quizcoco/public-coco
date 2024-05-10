package com.quizcoco.web.service;

import com.quizcoco.web.entity.Coco;

public interface CocoService {

        Coco getCocoById(long userId);

        String getCocoImgUrl(Long useredId);

    
}

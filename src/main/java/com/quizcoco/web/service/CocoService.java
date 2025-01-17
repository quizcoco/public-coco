package com.quizcoco.web.service;

import com.quizcoco.web.entity.Coco;

public interface CocoService {

        Coco getCocoByUserId(Long userId);

        String getCocoImgUrl(Long userId);

        void regCoco(Long userId);
        void editCoco(Long userId, Coco coco);

    
}

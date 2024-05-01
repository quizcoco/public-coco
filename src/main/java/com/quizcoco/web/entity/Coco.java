package com.quizcoco.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Coco { 

    private long id;
    private String name;
    private int gender;
    private int hungry;
    private int level;
    private int hp;
    private LocalDateTime birth;

    private long userId;
    private long skillId;
    private long stateId;
    private long typeId;

    
}

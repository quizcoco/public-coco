package com.quizcoco.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Avatar {
    
    private Long id;
    private int level;
    private int exp;
    private Integer gender;
    private int hp;
    private int dex;
    private String img;

    private Long userId;

}

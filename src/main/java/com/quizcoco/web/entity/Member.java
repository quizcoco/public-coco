package com.quizcoco.web.entity;

import java.time.LocalDateTime;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Member {
    
    private Long id;
    private String pw;
    private String name;
    private int level;
    private int point;
    private int exp;
    private LocalDateTime joinDate;
    private String mail;

    //외래키
    private Long adminId;
    private Long teamId;
    private Long userId;
    private Long userId1;
}

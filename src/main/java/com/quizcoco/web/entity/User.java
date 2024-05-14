package com.quizcoco.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class User {
    
    private Long id;
    private String pw;
    private String userName;
    private String nickName;
    private int level;
    private int point;
    private int exp;
    private LocalDateTime joinDate;
    private String mail;
    private String img;
    private String message;

}

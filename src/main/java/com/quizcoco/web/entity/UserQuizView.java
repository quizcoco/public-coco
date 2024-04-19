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
public class UserQuizView {

    private Long id;
    private String question;
    private String num1;
    private String num2;
    private String num3;
    private String num4;
    private String answer;
    private String commentary;
    private LocalDateTime regDate;
    private String category;
    
    //외래키
    private Long userId;
    
}

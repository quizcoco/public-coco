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
public class UserOXQuiz {

    private Long id;
    private String question;
    private String answer;
    private String commentary;
    private LocalDateTime regDate;
    
    //외래키
    private Long userId;
    
}

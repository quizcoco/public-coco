package com.quizcoco.web.entity;

import java.time.LocalDateTime;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserShortQuiz {

    private Long id;
    private String question;
    private String answer;
    private String commentary;
    private LocalDateTime regDate;
    
    //외래키
    private Long userId;
}

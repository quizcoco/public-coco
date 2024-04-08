package com.quizcoco.web.entity;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserMultipleQuiz {
    
    private Long id;
    private String question;
    private String num1;
    private String num2;
    private String num3;
    private String num4;
    private int answer;
}

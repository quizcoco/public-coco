package com.quizcoco.web.entity;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExamQuizView {
    
private Long id;
private int year;
private String question;
private String context;
private String num1;
private String num2;
private String num3;
private String num4;
private int answer;
private Date regDate;
private boolean like;

// 외래키
private String type;
private String rank;
private Long adminId;

}

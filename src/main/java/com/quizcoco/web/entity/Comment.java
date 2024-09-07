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
public class Comment {

    private Long id;
    private String comment;
    private LocalDateTime regDate;
    private Long postId;
    private Long userId;
    private Integer anonymousNum;
    
}

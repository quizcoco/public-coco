package com.quizcoco.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GuestBook {
    
    private Long id;
    private Long writerId;
    private String writerName;
    private String content; 
    private Long userId;
    private LocalDateTime regDate;

    
}

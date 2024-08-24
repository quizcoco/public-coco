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
public class Boardrecommend {

    private Long userId;
    private Long postId;
    private LocalDateTime regDate;

    

    
}

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
public class Board {
    private Long id;
    private String title;
    private String img;
    private String content;
    private LocalDateTime regDate;
    private int viewCount;

}

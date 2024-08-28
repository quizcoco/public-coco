package com.quizcoco.web.entity;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<BoardImage> img; //이거 지울듯
    private String content;
    private LocalDateTime regDate;
    private int viewCount;

    private Long userId;

}

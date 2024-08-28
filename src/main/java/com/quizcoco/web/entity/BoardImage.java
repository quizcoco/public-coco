package com.quizcoco.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardImage {

    private Long id;
    private Long boardId;
    private String imageUrl;
    
}

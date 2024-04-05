package com.quizcoco.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Test {
    
    private Long id;
    private String quiz;
    private String answer; 
    
}

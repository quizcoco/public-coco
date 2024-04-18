package com.quizcoco.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MemberRole {
    
    private Long id;
    private Long memberId;
    private String roleName;

}

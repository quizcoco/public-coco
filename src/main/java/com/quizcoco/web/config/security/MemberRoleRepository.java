package com.quizcoco.web.config.security;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.MemberRole;

@Mapper
public interface MemberRoleRepository {

    List<MemberRole> findAllByMemberId(Long memberId);
    
}

package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.Member;

@Mapper
public interface MemberRepository {

    Member findByUserName(String name);
 
}

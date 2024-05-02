package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.MatchReport;

@Mapper
public interface MatchReportRepository {


    void save(Long userId,Long quizId,boolean wrong);
    
}

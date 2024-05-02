package com.quizcoco.web.service;

import com.quizcoco.web.entity.MatchReport;

public interface MatchReportService {


    void reg(Long userId,Long quiz,boolean wrong);

    
}

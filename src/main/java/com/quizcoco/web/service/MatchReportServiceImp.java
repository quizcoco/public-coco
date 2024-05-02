package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.MatchReport;
import com.quizcoco.web.repository.MatchReportRepository;

@Service
public class MatchReportServiceImp implements MatchReportService {

    @Autowired
    private MatchReportRepository repository;

    @Override
    public void reg(Long userId,Long quiz,boolean wrong) {
        repository.save(userId,quiz,wrong);
    }
    
}

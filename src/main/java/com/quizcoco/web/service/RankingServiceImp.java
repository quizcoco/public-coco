package com.quizcoco.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.User;
import com.quizcoco.web.repository.RankingRepository;

@Service
public class RankingServiceImp implements RankingService {

    @Autowired
    private RankingRepository repository;

    @Override
    public List<User> getUsersOrderByPoint() {
        
        return repository.findAllByOrderByPoint();
    }

    public int getUserRank(String userId) {

        return repository.findRankByUserId(userId);
    }
    
}

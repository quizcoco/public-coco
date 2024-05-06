package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.User;

public interface RankingService {

    List<User> getUsersOrderByPoint();

    int getUserRank(String userId);
    
}

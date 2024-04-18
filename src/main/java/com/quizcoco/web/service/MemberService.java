package com.quizcoco.web.service;

import com.quizcoco.web.entity.Member;

public interface MemberService {
    
    Member getByUserName(String name);
}


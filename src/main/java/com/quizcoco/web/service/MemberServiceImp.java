package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Member;
import com.quizcoco.web.repository.MemberRepository;

@Service
public class MemberServiceImp implements MemberService {
    
    @Autowired
    private MemberRepository repository;

    @Override
    public Member getByUserName(String name) {
       
        return repository.findByUserName(name);
    }

    @Override
    public boolean validate(String name, String password) {
      
        Member member = repository.findByUserName(name);

        if(member == null)
            return false;
        
        if(!member.getPw().equals(password))
            return false;
            
            return true;
    }


}

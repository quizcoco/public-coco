package com.quizcoco.web.config.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Member;
import com.quizcoco.web.entity.MemberRole;
import com.quizcoco.web.repository.MemberRepository;

@Service
public class WebUserDetailsService implements UserDetailsService {
    
    @Autowired
    private MemberRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        
        Member member = repository.findByUserName(name);
        List<MemberRole> roles = memberRoleRepository.findAllByMemberId(member.getId());
        
        WebUserDetails userDetails = new WebUserDetails();
        userDetails.setId(member.getId());
        userDetails.setLevel(member.getLevel());
        userDetails.setPoint(member.getPoint());
        userDetails.setExp(member.getExp());
        userDetails.setMail(member.getMail());
        userDetails.setUsername(member.getName());
        userDetails.setPassword(member.getPw());
        userDetails.setAuthorities(null);

        return userDetails;
    }

}

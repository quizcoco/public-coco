package com.quizcoco.web.config.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Member;
import com.quizcoco.web.entity.MemberRole;
import com.quizcoco.web.repository.MemberRepository;
import com.quizcoco.web.repository.MemberRoleRepository;

@Service
public class CocoUserDetailsService implements UserDetailsService {
    
    @Autowired
    private MemberRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        
        Member member = repository.findByUserName(name);

        List<MemberRole> roles = memberRoleRepository.findAllByMemberId(member.getId());
        
        List<GrantedAuthority> authorities = new ArrayList<>();

        for(MemberRole role : roles)
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));

        CocoUserDetails userDetails = new CocoUserDetails();
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

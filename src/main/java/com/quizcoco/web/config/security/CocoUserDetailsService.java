package com.quizcoco.web.config.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.MemberRole;
import com.quizcoco.web.entity.User;
import com.quizcoco.web.repository.UserRepository;
import com.quizcoco.web.repository.MemberRoleRepository;

@Service
public class CocoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        //User user = repository.findByUserName(username);
        Optional<User> optionalUser = repository.findByUserName(username);
    
        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다."));

        List<MemberRole> roles = memberRoleRepository.findAllByUserId(user.getId());
        
        List<GrantedAuthority> authorities = new ArrayList<>();

        for(MemberRole role : roles)
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));

        CocoUserDetails userDetails = new CocoUserDetails();
        userDetails.setId(user.getId());
        userDetails.setLevel(user.getLevel());
        userDetails.setPoint(user.getPoint());
        userDetails.setExp(user.getExp());
        userDetails.setMail(user.getMail());
        userDetails.setNickname(user.getNickName());
        userDetails.setUsername(user.getUserName());
        userDetails.setPassword(user.getPw());
        userDetails.setImg(user.getImg());
        userDetails.setMessage(user.getMessage());        
        userDetails.setAuthorities(authorities);
        System.out.println("authorities==========:"+authorities);

        return userDetails;

    }

}

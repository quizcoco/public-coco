package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quizcoco.web.config.security.CocoUserDetails;
import com.quizcoco.web.config.security.CocoUserDetailsService;
import com.quizcoco.web.entity.MemberRole;
import com.quizcoco.web.entity.User;
import com.quizcoco.web.repository.MemberRoleRepository;
import com.quizcoco.web.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {
    
    @Autowired
    private UserRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Autowired
    private CocoUserDetailsService userDetailsService;

    @Override
    public User getByUserName(String username) throws UsernameNotFoundException {

        //User user = repository.findByUserName(username);
       
        return repository.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException("\""+username+"\" 회원을 찾을 수 없습니다."));
    }    


    @Override
    @Transactional
    public void sign(User user) {
       // 회원 정보 저장
        repository.save(user);
        
        // 회원의 역할 저장
        MemberRole memberRole = new MemberRole();
        memberRole.setUserId(user.getId());
        memberRole.setRoleName("ROLE_MEMBER");
        memberRoleRepository.saveMemberRole(memberRole);
    }

    // 아이디 중복체크
    @Override
    public boolean usernameExists(String username) {
        return repository.usernameExists(username) > 0;
    }

    // 메일 중복체크
    @Override
    public boolean mailExists(String mail) {
        return repository.mailExists(mail) > 0;
    }


    @Override
    public User getByUserId(Long userId) {
        User user= repository.findByUserId(userId);
        return user;
    }


    @Override
    public void editUser(User user) {
        repository.update(user);
    }
    

    //회원 정보 업데이트
    @Override
    @Transactional
    public void updateUser(User user) {
        repository.updateUser(user);
        updateSecurityContext(user.getUserName());
       
    }

     // 회원 정보 업데이트 시큐리티에 바로 적용하기 위해 사용.
    private void updateSecurityContext(String username) {
       
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                                                                    userDetails, userDetails.getPassword(),
                                                                    userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);                                                        
    }

    @Override
    public boolean nicknameExists(String nickname) {
        
        return repository.nicknameExists(nickname) > 0;
    }


    @Override
    public boolean messageExists(String message) {
        
        return repository.messageExists(message) > 0;
    }


    @Override
    public int getUserExp(Long useredId) {
        
        return repository.findExpByUserId(useredId);
    }


    @Override
    public int getUserLevel(Long useredId) {
        
        return repository.findLevelByUserId(useredId);
    }


    @Override
    public int getUserPoint(Long useredId) {
        
        return repository.findPointByUserId(useredId);
    }

    //=====================================================================
    @Override
    public Long getCurrentUserId() {


        CocoUserDetails user = (CocoUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long currentUserId = null; 
        if(user != null)
        currentUserId=user.getId();

        return currentUserId;

    }
}

package com.quizcoco.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public User getByUserName(String username) {
       
        return repository.findByUserName(username);
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

    //메일 중복체크
    @Override
    public int mailCheck(String mail) throws Exception {
       
        int result = repository.mailCheck(mail);

        return result;
    }

    // 아이디 중복체크
    @Override
    public int nameCheck(String username) throws Exception {
        
        int result = repository.nameCheck(username);

        return result;
    }

    // 닉네임 중복체크
    @Override
    public int nickCheck(String nickname) throws Exception {
        
        int result = repository.nickCheck(nickname);

        return result;
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


}

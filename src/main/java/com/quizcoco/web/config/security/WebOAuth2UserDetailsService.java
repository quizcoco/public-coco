package com.quizcoco.web.config.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.MemberRole;
import com.quizcoco.web.entity.User;
import com.quizcoco.web.repository.MemberRoleRepository;
import com.quizcoco.web.repository.UserRepository;

@Service
public class WebOAuth2UserDetailsService implements OAuth2UserService<OAuth2UserRequest,OAuth2User>{

    @Autowired
    private UserRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;


    @Override//구글일때 네이버일때 조건처리해서 한곳에
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest,OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");//★
        String username = oAuth2User.getAttribute("name");
        User user = repository.findByEmail(email);

        System.out.println("username%%%%%%%%%%%%%%%%%%"+oAuth2User.getAttributes());
        
        CocoUserDetails userDetails = new CocoUserDetails();
        
        userDetails.setAttributes(oAuth2User.getAttributes());
        userDetails.setName(oAuth2User.getName());
        userDetails.setUsername(username); //princlpalName오류 뜬다네요.......여기서로그인된다고 로그인된게아니라네요 회원가입해야...



        if(user == null)//기존에 가입한적 없을때
            return userDetails;

            //========security info========

            List<MemberRole> roles = memberRoleRepository.findAllByUserId(user.getId());
        
        List<GrantedAuthority> authorities = new ArrayList<>();

        for(MemberRole role : roles)
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));

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


        return userDetails;
   }
    
}

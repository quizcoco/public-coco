package com.quizcoco.web.config.security;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class CocoUserDetails implements UserDetails,OAuth2User {

    private Long id;
    private int level;
    private String nickname;
    private int point;
    private int exp;
    private String mail;
    private String username;
    private String password;
    private String img;
    private String message;
    private List<GrantedAuthority> authorities;

/* ----------- getter ------------- */

    public Long getId() {
        return id;
    }

    public int getLevel() {
        return level;
    }

    public int getPoint() {
        return point;
    }

    public int getExp() {
        return exp;
    }

    public String getMail() {
        return mail;
    }

    public String getNickname() {
        return nickname;
    }

    public String getImg() {
        return img;
    }

    public String getMessage() {
        return message;
    }

/* --------------- setter ---------- */

    public void setId(Long id) {
        this.id = id;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public void setPoint(int point) {
        this.point = point;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        
        return authorities; 
    }

    public void setAuthorities(List<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        
        return true;
    }

    @Override
    public boolean isEnabled() {
        
        return true;
    }

    //========구글 소셜==========================

    private Map<String, Object> attributes;
    private String name;

    @Override
    public Map<String, Object> getAttributes() {
       return attributes;
    }

    @Override
    public String getName() {
       return name;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public void setName(String name) {
        this.name = name;
    }

    
}
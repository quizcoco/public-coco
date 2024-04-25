package com.quizcoco.web.config.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CocoUserDetails implements UserDetails {

    private Long id;
    private int level;
    private String nickname;
    private int point;
    private int exp;
    private String mail;
    private String username;
    private String password;
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

    
}
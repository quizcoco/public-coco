package com.quizcoco.web.config.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component//이도저도 아닐때는 컴포넌트
public class LoginSuccessHandler implements AuthenticationSuccessHandler{
//인증에 성공했을때 할거 역할에따라 보낼때

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();//url더하기 어쩌구 도와주는

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
       
                System.out.println("석세스===========================");

                String url = "/";

                CocoUserDetails userDetails = (CocoUserDetails) authentication.getPrincipal();
                //어써러티로 비교
                if(userDetails.getAuthorities()==null){
                    //로그아웃=세션날리기
                    // request.logout();//1.안됨  
                    // SecurityContextHolder.clearContext();//2.컨텍스트 홀더날리기 안됨
                    HttpSession session = request.getSession(false);//false : 없으면 null 가져와 새로만들지마
                    if(session!=null)// 실제 인증 데이터는 세션에서 관리
                        session.invalidate();
                    
                    url="/user/sign";
                }

                // url="/admin/index";

                redirectStrategy.sendRedirect(request, response, url);
    }
    
}

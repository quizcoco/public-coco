package com.quizcoco.web.config.security;

import java.io.IOException;
import java.net.URLEncoder;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component//이도저도 아닐때는 컴포넌트
public class LoginSuccessHandler implements AuthenticationSuccessHandler{
//인증에 성공했을때 할거 역할에따라 보낼때

    private RequestCache requestCache = new HttpSessionRequestCache();
    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();//url더하기 어쩌구 도와주는

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

                clearSession(request);//로그인 성공시 이전 실패기록을 지운다는데
       
                String url = "/";

                // 이전페이지를 세션에 저장한것을 꺼내 대입
                String prevPage = (String) request.getSession().getAttribute("prevPage");
                if (prevPage != null) {
                    url = prevPage;
                    request.getSession().removeAttribute("prevPage"); //지움
                }

                SavedRequest savedRequest = requestCache.getRequest(request, response); //권한없는 페이지에서 인터셉트 당한경우
                if (savedRequest != null) {
                    url = savedRequest.getRedirectUrl();
                }

                if(url ==null || url.equals(""))
                    url = "/";
                
                    

                CocoUserDetails userDetails = (CocoUserDetails) authentication.getPrincipal();
                //어써러티로 비교
                if (userDetails.getAuthorities() == null || userDetails.getAuthorities().isEmpty()) {

                    //로그아웃=세션날리기
                    // request.logout();//1.안됨  
                    // SecurityContextHolder.clearContext();//2.컨텍스트 홀더날리기 안됨
                    HttpSession session = request.getSession(false);//false : 없으면 null 가져와 새로만들지마
                    if(session!=null)// 실제 인증 데이터는 세션에서 관리
                        session.invalidate();
                    
                    url="/user/sign";
                }

                redirectStrategy.sendRedirect(request, response, url);
    }

    // 로그인 실패 후 성공 시 남아있는 에러 세션 제거
    protected void clearSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
        }
    }
    
}

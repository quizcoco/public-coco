package com.quizcoco.web.config.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.quizcoco.web.websocket.handler.ActiveUsersHandler;

import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;

// @Component
public class SessionTimeoutListener implements HttpSessionListener {

    @Autowired
    private ActiveUsersHandler activeUsersHandler;

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {

        String userImg = (String) se.getSession().getAttribute("img");


        if (userImg != null) {
           
            System.out.println("세션이 파괴되었나요???: " + userImg);
            activeUsersHandler.notifyUserLogout(userImg); // 예시
        }
        
        
    }
    
}

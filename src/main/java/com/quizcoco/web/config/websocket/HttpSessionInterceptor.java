package com.quizcoco.web.config.websocket;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import jakarta.servlet.http.HttpSession;

@Component
public class HttpSessionInterceptor implements HandshakeInterceptor{

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
       

                if(request instanceof ServletServerHttpRequest){

                    ServletServerHttpRequest servletRequest = (ServletServerHttpRequest)request;
                    HttpSession session = servletRequest.getServletRequest().getSession(false);

                    if(session != null){
                        attributes.put("HTTP_SESSION", session);        
                    }
                }
                return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Exception exception) {
    
    }


    
}











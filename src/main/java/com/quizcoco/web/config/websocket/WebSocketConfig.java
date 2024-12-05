package com.quizcoco.web.config.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.quizcoco.web.websocket.handler.ActiveUsersHandler;

//https://a-develop.tistory.com/95


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
       registry.addHandler(new ActiveUsersHandler(), "/active-users")
       .addInterceptors(new HttpSessionInterceptor())
    .setAllowedOrigins("http://localhost:8080","http://quizcoco.net"); //*은 전체에서
    }
    
}

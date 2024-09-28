package com.quizcoco.web.websocket.handler;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class ActiveUsersHandler extends TextWebSocketHandler  {


    private Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("Connection Established: " + session.getId()); // 로그 추가

        broadcastUserCount();
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        broadcastUserCount();
    }

    private void broadcastUserCount() throws IOException{

        String message = "" + sessions.size();
        TextMessage userCountMessage = new TextMessage(message);

        for(WebSocketSession session : sessions)
            session.sendMessage(userCountMessage);
    }

    public void notifyUserLogin(){


        
    }



}




    

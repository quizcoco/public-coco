package com.quizcoco.web.websocket.handler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.quizcoco.web.entity.User;

import jakarta.servlet.http.HttpSession;

@Component
public class ActiveUsersHandler extends TextWebSocketHandler  {


    private Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
    private Set<String> userImgList = new CopyOnWriteArraySet<>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        HttpSession httpSession = (HttpSession)session.getAttributes().get("HTTP_SESSION");
        String userImg = httpSession != null ? (String) httpSession.getAttribute("img") : null;

        session.getAttributes().put("userImg", userImg);

        sessions.add(session);
        // System.out.println("Connection Established: " + session.getId()); // 로그 추가

        broadcastUserCount();
        notifyUserLogin(userImg);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

        // HttpSession httpSession = (HttpSession)session.getAttributes().get("HTTP_SESSION");
        sessions.remove(session);
        String userImg =(String)session.getAttributes().get("userImg");

        if(userImg != null){
            notifyUserLogout(userImg);
        }
            broadcastUserCount();

    }

    private void broadcastUserCount() throws IOException{

        String message = String.format("{\"type\":\"count\",\"value\":%d}" , sessions.size());
        TextMessage userCountMessage = new TextMessage(message);

        for(WebSocketSession session : sessions)
            session.sendMessage(userCountMessage);
    }

    public void notifyUserLogin(String userImg){

        if(userImgList.add(userImg)){

            //여러개 할 경우... 하고나서 json해서 String으로 보내기
            String message = String.format("{\"type\":\"imageList\",\"value\":%s}" , new Gson().toJson(userImgList));
            broadcastToAll(message);
        }
       
    }
    public void notifyUserLogout(String userImg){

        userImgList.remove(userImg);
        String message = String.format("{\"type\":\"logout\",\"value\":\"%s\"}" , userImg);
        broadcastToAll(message);

        


    }

    //모든 클라이언트에 메세지 전송
    private void broadcastToAll(String message) {
        TextMessage textMessage = new TextMessage(message);
        for (WebSocketSession session : sessions) {
            try {
                session.sendMessage(textMessage);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


}




    

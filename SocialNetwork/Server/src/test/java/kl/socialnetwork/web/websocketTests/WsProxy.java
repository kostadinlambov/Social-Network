//package kl.socialnetwork.web.websocketTests;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Component;
//
//@Component
//public class WsProxy {
//
//    private SimpMessagingTemplate messagingTemplate;
//
//    @Autowired
//    public WsProxy(SimpMessagingTemplate messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    public void sendMessage(String clientId, String payload){
//        messagingTemplate.convertAndSend("/queue/" + clientId, payload);
//    }
//}
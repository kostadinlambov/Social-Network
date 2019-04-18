package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.services.MessageService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SUCCESSFUL_CREATE_MESSAGE_MESSAGE;

@RestController
public class WebSocketController {

    // The SimpMessagingTemplate is used to send Stomp over WebSocket messages.
    private final SimpMessagingTemplate template;
    private final ObjectMapper objectMapper;
    private final MessageService messageService;


    @Autowired
    WebSocketController(SimpMessagingTemplate template, ObjectMapper objectMapper, MessageService messageService) {
        this.template = template;
        this.objectMapper = objectMapper;
        this.messageService = messageService;
    }

    /*
     * This MessageMapping annotated method will be handled by
     * SimpAnnotationMethodMessageHandler and after that the Message will be
     * forwarded to Broker channel to be forwarded to the client via WebSocket
     */
    @MessageMapping("/all")
    @SendTo("/topic/all")
    public Map<String, String> post(@Payload Map<String, String> message) {
        message.put("timestamp", Long.toString(System.currentTimeMillis()));
//        chatHistoryDao.save(message);
        return message;
    }

    @RequestMapping("/history")
    public List<Map<String, String>> getChatHistory() {
//        return chatHistoryDao.get();
        return null;
    }

//    @MessageMapping("/send/message")
//    public void onReceivedMesage(String message){
//        System.out.println(message);
//        this.template.convertAndSend("/chat",  new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "+message);
//    }

    @MessageMapping("/send/message")
    @SendTo("/chat")
    public String send(String message) throws JsonProcessingException {
        System.out.println(message);
//        boolean result = this.messageService.createMessage(message);

//        if (result) {
        SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_CREATE_MESSAGE_MESSAGE, message, true);
//            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        return this.objectMapper.writeValueAsString(successResponse);
//        }
        //        this.template.convertAndSend("/chat",  new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "+message);
    }

    // @SendToUser is used to direct the output message to only the user associated with the input message
//    @SendToUser()
//    @SendTo is used to customize the target destination or to specify multiple destinations.

//    @MessageMapping("/{roomId}")
////    @SendTo("/chat/25")
//    public void sendMessageTpPrivateRoom(Object message, @DestinationVariable String roomId) {
//        System.out.println(message);
//        this.template.convertAndSend("/chat/25", new SimpleDateFormat("HH:mm:ss").format(new Date()) + "- " + message);
////        this.template.convertAndSend("/privateRoom" + roomId + message);
//    }

//    @MessageMapping("/{roomId}")
////    @SendTo("/chat/25")
//    public void sendMessageTpPrivateRoom(String message, @DestinationVariable String roomId) {
//        System.out.println(message);
//        this.template.convertAndSend("/chat/25", new SimpleDateFormat("HH:mm:ss").format(new Date()) + "- " + message);
////        this.template.convertAndSend("/privateRoom" + roomId + message);
//    }
}

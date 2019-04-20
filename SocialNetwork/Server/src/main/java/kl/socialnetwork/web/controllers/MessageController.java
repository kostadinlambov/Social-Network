package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.MessageServiceModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageAllViewModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageFriendsViewModel;
import kl.socialnetwork.services.MessageService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;

@RestController()
@RequestMapping(value = "/message")
public class MessageController {
    // The SimpMessagingTemplate is used to send Stomp over WebSocket messages.
    private final SimpMessagingTemplate template;

    private final MessageService messageService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;


    @Autowired
    public MessageController(SimpMessagingTemplate template, MessageService messageService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.template = template;
        this.messageService = messageService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/all/{id}")
    public List<MessageAllViewModel> getAllMessages(@PathVariable(value = "id") String chatUserId, Authentication principal) {
        String loggedInUsername = principal.getName();

        List<MessageServiceModel> messageServiceModels = this.messageService.getAllMessages(loggedInUsername, chatUserId);

        return messageServiceModels.stream()
                .map(messageServiceModel -> modelMapper.map(messageServiceModel, MessageAllViewModel.class))
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/friend")
    public List<MessageFriendsViewModel> getAllFriendMessages(Authentication principal) {
        String loggedInUsername = principal.getName();

        return this.messageService.getAllFriendMessages(loggedInUsername);
    }

    /*
     * This MessageMapping annotated method will be handled by
     * SimpAnnotationMethodMessageHandler and after that the Message will be
     * forwarded to Broker channel to be forwarded to the client via WebSocket
     */
    @MessageMapping("/message")
    public void createPrivateChatMessages(@RequestBody @Valid MessageCreateBindingModel messageCreateBindingModel, Principal principal, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        MessageServiceModel message = this.messageService.createMessage(messageCreateBindingModel, principal.getName());
        MessageAllViewModel messageAllViewModel = this.modelMapper.map(message, MessageAllViewModel.class);

        if (messageAllViewModel != null) {
            String response = this.objectMapper.writeValueAsString(messageAllViewModel);
            template.convertAndSend("/user/" + message.getToUser().getUsername() + "/queue/position-update", response);
            template.convertAndSend("/user/" + message.getFromUser().getUsername() + "/queue/position-update", response);
            return;
        }
        throw new CustomException(SERVER_ERROR_MESSAGE);
    }
}

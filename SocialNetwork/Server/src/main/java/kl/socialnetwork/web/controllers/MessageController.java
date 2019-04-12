package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.MessageServiceModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageAllViewModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageFriendsViewModel;
import kl.socialnetwork.services.MessageService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;

@RestController()
@RequestMapping(value = "/message")
public class MessageController {
    private final MessageService messageService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public MessageController(MessageService messageService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.messageService = messageService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    @PostMapping (value = "/create")
    public ResponseEntity<Object> createMessage(@RequestBody @Valid MessageCreateBindingModel messageCreateBindingModel, Authentication principal) throws Exception {
        String loggedInUsername = principal.getName();
        boolean message = this.messageService.createMessage(messageCreateBindingModel, loggedInUsername);

        if (message) {
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_CREATE_MESSAGE_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(SERVER_ERROR_MESSAGE);
    }

    @GetMapping(value = "/all/{id}")
    public List<MessageAllViewModel> getAllMessages(@PathVariable(value = "id") String chatUserId , Authentication principal) {
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
}

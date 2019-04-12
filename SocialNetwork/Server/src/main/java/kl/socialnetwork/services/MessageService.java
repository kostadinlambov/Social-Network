package kl.socialnetwork.services;

import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.MessageServiceModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageUnreadViewModel;

import java.util.List;

public interface MessageService {

    boolean createMessage(MessageCreateBindingModel messageCreateBindingModel, String loggedInUsername) throws Exception;

    List<MessageServiceModel> getAllMessages(String loggedInUsername, String chatUserId);

    List<MessageUnreadViewModel> getAllUnreadMessages(String loggedInUsername);
}

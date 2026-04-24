package vvyy.socialnetwork.services;

import vvyy.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import vvyy.socialnetwork.domain.models.serviceModels.MessageServiceModel;
import vvyy.socialnetwork.domain.models.viewModels.message.MessageFriendsViewModel;

import java.util.List;

public interface MessageService {

    MessageServiceModel createMessage(MessageCreateBindingModel messageCreateBindingModel, String loggedInUsername) throws Exception;

    List<MessageServiceModel> getAllMessages(String loggedInUsername, String chatUserId);

    List<MessageFriendsViewModel> getAllFriendMessages(String loggedInUsername);
}

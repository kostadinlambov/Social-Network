package kl.socialnetwork.testUtils;

import kl.socialnetwork.domain.entities.Message;
import kl.socialnetwork.domain.entities.Relationship;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.MessageServiceModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageAllViewModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageFriendsViewModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class MessagesUtils {
    public static Message createMessage(User fromUser, User toUser, Relationship relationship) {
        LocalDateTime time = LocalDateTime.now();
        return new Message() {{
            setId("1");
            setFromUser(fromUser);
            setToUser(toUser);
            setRelationship(relationship);
            setContent("content message");
            setSubject("subject message");
            setStatus(0);
            setTime(time);
        }};
    }

    public static List<Message> getMessages(int count, User fromUser, User toUser, Relationship relationship) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new Message() {{
                    setId(String.valueOf(index + 1));
                    setFromUser(fromUser);
                    setToUser(toUser);
                    setRelationship(relationship);
                    setContent("message " + index + " content");
                    setSubject("message " + index + " subject");
                    setStatus(0);
                    setTime(time);
                }})
                .collect(Collectors.toList());
    }

    public static List<MessageServiceModel> getMessageServiceModels(int count, User fromUser, User toUser, Relationship relationship) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new MessageServiceModel() {{
                    setId(String.valueOf(index + 1));
                    setFromUser(fromUser);
                    setToUser(toUser);
                    setRelationship(relationship);
                    setContent("message " + index + " content");
                    setSubject("message " + index + " subject");
                    setStatus(0);
                    setTime(time);
                }})
                .collect(Collectors.toList());
    }

    public static List<MessageAllViewModel> getMessageAllViewModels(int count) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new MessageAllViewModel() {{
                    setId(String.valueOf(index + 1));
                    setFromUserId(String.valueOf(index + 1));
                    setFromUserProfilePicUrl("profilePic " + index );
                    setContent("message " + index + " content");
                    setTime(time);
                }})
                .collect(Collectors.toList());
    }

    public static List<MessageFriendsViewModel> getMessageFriendsViewModels(int count) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new MessageFriendsViewModel() {{
                    setId(String.valueOf(index + 1));
                    setFromUserId(String.valueOf(index + 1));
                    setFromUserProfilePicUrl("fromUserProfilePicUrl " + index);
                    setFromUserFirstName("firstName " + index);
                    setFromUserLastName("laststName " + index);
                    setContent("message " + index + " content");
                    setTime(time);
                    setCount(1);
                }})
                .collect(Collectors.toList());
    }

    public static MessageCreateBindingModel getMessageCreateBindingModel() {
        return new MessageCreateBindingModel() {{
            setContent("message content");
            setToUserId("toUserId");
        }};
    }

    public static List<Object[]> getCountOfUnreadMessagesObjectArr(int count) {
        return IntStream.range(0, count)
                .mapToObj(index -> new Object[]{
                        String.valueOf(index + 1),
                        String.valueOf(1),
                })
                .collect(Collectors.toList());
    }
}

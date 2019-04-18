package kl.socialnetwork.domain.models.viewModels.message;

import java.time.LocalDateTime;

public class MessageAllViewModel {
    private String id;
    private String fromUserId;
    private String fromUserFirstName;
    private String fromUserLastName;
    private String fromUserProfilePicUrl;
    private String content;
    private LocalDateTime time;

    public MessageAllViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFromUserId() {
        return this.fromUserId;
    }

    public void setFromUserId(String fromUserId) {
        this.fromUserId = fromUserId;
    }

    public String getFromUserFirstName() {
        return this.fromUserFirstName;
    }

    public void setFromUserFirstName(String fromUserFirstName) {
        this.fromUserFirstName = fromUserFirstName;
    }

    public String getFromUserLastName() {
        return this.fromUserLastName;
    }

    public void setFromUserLastName(String fromUserLastName) {
        this.fromUserLastName = fromUserLastName;
    }

    public String getFromUserProfilePicUrl() {
        return this.fromUserProfilePicUrl;
    }

    public void setFromUserProfilePicUrl(String fromUserProfilePicUrl) {
        this.fromUserProfilePicUrl = fromUserProfilePicUrl;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}

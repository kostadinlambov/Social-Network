package kl.socialnetwork.domain.models.viewModels.message;

import java.time.LocalDateTime;

public class MessageAllViewModel {
    private String fromUserId;
    private String content;
    private LocalDateTime time;

    public MessageAllViewModel() {
    }

    public String getFromUserId() {
        return this.fromUserId;
    }

    public void setFromUserId(String fromUserId) {
        this.fromUserId = fromUserId;
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

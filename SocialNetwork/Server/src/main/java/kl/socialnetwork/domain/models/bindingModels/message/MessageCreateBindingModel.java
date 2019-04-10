package kl.socialnetwork.domain.models.bindingModels.message;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class MessageCreateBindingModel {
    private String toUserId;
    private String content;

    public MessageCreateBindingModel() {
    }

    @NotNull
    @NotEmpty
    public String getToUserId() {
        return this.toUserId;
    }

    public void setToUserId(String toUserId) {
        this.toUserId = toUserId;
    }

    @NotNull
    @NotEmpty
    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

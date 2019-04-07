package kl.socialnetwork.domain.models.bindingModels.post;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class PostCreateBindingModel {
    private String timelineUserId;
    private String loggedInUserId;
    private String content;
    private String imageUrl;

    public PostCreateBindingModel() {
    }

    @NotNull
    @NotEmpty
    public String getTimelineUserId() {
        return this.timelineUserId;
    }

    public void setTimelineUserId(String timelineUserId) {
        this.timelineUserId = timelineUserId;
    }

    @NotNull
    @NotEmpty
    public String getLoggedInUserId() {
        return this.loggedInUserId;
    }

    public void setLoggedInUserId(String loggedInUserId) {
        this.loggedInUserId = loggedInUserId;
    }

    @NotNull
    @NotEmpty
    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}

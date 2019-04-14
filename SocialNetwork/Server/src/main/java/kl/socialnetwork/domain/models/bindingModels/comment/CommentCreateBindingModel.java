package kl.socialnetwork.domain.models.bindingModels.comment;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CommentCreateBindingModel {
    private String postId;
    private String loggedInUserId;
    private String timelineUserId;
    private String content;
    private String imageUrl;

    @NotNull
    @NotEmpty
    public String getPostId() {
        return this.postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
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
    public String getTimelineUserId() {
        return this.timelineUserId;
    }

    public void setTimelineUserId(String timelineUserId) {
        this.timelineUserId = timelineUserId;
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

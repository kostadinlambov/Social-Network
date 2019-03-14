package kl.socialnetwork.domain.modles.bindingModels.post;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class PostCreateBindingModel {
    private String userId;
    private String content;
    private String imageUrl;

    public PostCreateBindingModel() {
    }


    @NotNull
    @NotEmpty
    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

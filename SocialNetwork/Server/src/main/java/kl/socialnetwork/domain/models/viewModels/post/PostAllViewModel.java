package kl.socialnetwork.domain.models.viewModels.post;

import kl.socialnetwork.domain.models.viewModels.comment.CommentAllViewModel;

import java.time.LocalDateTime;
import java.util.List;

public class PostAllViewModel {
    private String postId;
    private String loggedInUserProfilePicUrl;
    private String loggedInUserFirstName;
    private String loggedInUserLastName;
    private String loggedInUserId;
    private String timelineUserId;
    private String content;
    private String imageUrl;
    private int likeCount;
    private LocalDateTime time;
    private List<CommentAllViewModel> commentList;

    public PostAllViewModel() {
    }

    public String getPostId() {
        return this.postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getLoggedInUserProfilePicUrl() {
        return this.loggedInUserProfilePicUrl;
    }

    public void setLoggedInUserProfilePicUrl(String loggedInUserProfilePicUrl) {
        this.loggedInUserProfilePicUrl = loggedInUserProfilePicUrl;
    }

    public String getLoggedInUserFirstName() {
        return this.loggedInUserFirstName;
    }

    public void setLoggedInUserFirstName(String loggedInUserFirstName) {
        this.loggedInUserFirstName = loggedInUserFirstName;
    }

    public String getLoggedInUserLastName() {
        return this.loggedInUserLastName;
    }

    public void setLoggedInUserLastName(String loggedInUserLastName) {
        this.loggedInUserLastName = loggedInUserLastName;
    }

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

    public int getLikeCount() {
        return this.likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getLoggedInUserId() {
        return this.loggedInUserId;
    }

    public void setLoggedInUserId(String loggedInUserId) {
        this.loggedInUserId = loggedInUserId;
    }

    public String getTimelineUserId() {
        return this.timelineUserId;
    }

    public void setTimelineUserId(String timelineUserId) {
        this.timelineUserId = timelineUserId;
    }

    public List<CommentAllViewModel> getCommentList() {
        return this.commentList;
    }

    public void setCommentList(List<CommentAllViewModel> commentList) {
        this.commentList = commentList;
    }
}

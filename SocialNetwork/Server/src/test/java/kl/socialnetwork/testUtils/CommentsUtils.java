package kl.socialnetwork.testUtils;

import kl.socialnetwork.domain.entities.Comment;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.bindingModels.comment.CommentCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.CommentServiceModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class CommentsUtils {
    public static Comment createComment(User loggedInUser, User timeLineUser, Post post) {
        LocalDateTime time = LocalDateTime.now();

        return new Comment() {{
            setId("1");
            setContent("content first comment");
            setCreator(loggedInUser);
            setTimelineUser(timeLineUser);
            setPost(post);
            setTime(time);
            setImageUrl("imageUrl");
        }};
    }

    public static List<Comment> getComments(int count, User loggedInUser, User timeLineUser, Post post) {
        return IntStream.range(0, count)
                .mapToObj(index -> new Comment() {{
                    setId(String.valueOf(index + 1));
                    setContent("content " + index + " comment");
                    setCreator(loggedInUser);
                    setTimelineUser(timeLineUser);
                    setPost(post);
                    setTime(LocalDateTime.now().plusSeconds((long)index));
                    setImageUrl("imageUrl" + index);
                }})
                .collect(Collectors.toList());
    }

    public static List<CommentServiceModel> getCommentServiceModels(int count, User loggedInUser, User timeLineUser, Post post) {

        return IntStream.range(0, count)
                .mapToObj(index -> new CommentServiceModel() {{
                    setId(String.valueOf(index + 1));
                    setContent("content " + index + " comment");
                    setCreator(loggedInUser);
                    setTimelineUser(timeLineUser);
                    setPost(post);
                    setTime(LocalDateTime.now().plusSeconds((long)index));
                    setImageUrl("imageUrl" + index);
                }})
                .collect(Collectors.toList());
    }

    public static List<CommentCreateBindingModel> getCommentCreateBindingModel(int count) {
        return IntStream.range(0, count)
                .mapToObj(index -> new CommentCreateBindingModel() {{
                    setPostId("post " + index + " id");
                    setContent("comment " + index + " content");
                    setLoggedInUserId("loggedInUserId" + index);
                    setTimelineUserId("timelineUserId" + index);
                    setImageUrl("ImageUrl" + index);
                }})
                .collect(Collectors.toList());
    }
}

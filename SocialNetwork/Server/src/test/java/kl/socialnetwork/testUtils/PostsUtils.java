package kl.socialnetwork.testUtils;

import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.PostServiceModel;
import kl.socialnetwork.domain.models.viewModels.post.PostAllViewModel;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PostsUtils {
    public static Post createPost(User loggedInUser, User timeLineUser) {
        LocalDateTime time = LocalDateTime.now();

        return new Post() {{
            setId("1");
            setContent("content first post");
            setTimelineUser(timeLineUser);
            setLoggedInUser(loggedInUser);
            setLike(new ArrayList<>());
            setTime(time);
            setImageUrl("imageUrl");
            setCommentList(new ArrayList<>());
        }};
    }

    public static List<Post> getPosts(int count, User loggedInUser, User timeLineUser) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new Post() {{
                    setId(String.valueOf(index + 1));
                    setContent("content " + index + " post");
                    setTimelineUser(timeLineUser);
                    setLoggedInUser(loggedInUser);
                    setLike(new ArrayList<>());
                    setTime(time);
                    setImageUrl("imageUrl" + index);
                    setCommentList(new ArrayList<>());
                }})
                .collect(Collectors.toList());
    }

    public static List<PostServiceModel> getPostServiceModels(int count, User loggedInUser, User timeLineUser) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new PostServiceModel() {{
                    setId(String.valueOf(index + 1));
                    setContent("content " + index + " post");
                    setTimelineUser(timeLineUser);
                    setLoggedInUser(loggedInUser);
                    setLike(new ArrayList<>());
                    setTime(time);
                    setImageUrl("imageUrl" + index);
                    setCommentList(new ArrayList<>());
                }})
                .collect(Collectors.toList());
    }

    public static List<PostAllViewModel> getPostAllViewModels(int count) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new PostAllViewModel() {{
                    setPostId(String.valueOf(index + 1));
                    setLoggedInUserId("loggedInUserId " + index + 1);
                    setTimelineUserId("timelineUserId " + index + 1);
                    setLoggedInUserFirstName("firstName " + index + 1);
                    setLoggedInUserLastName("lastName " + index + 1);
                    setContent("content " + index + " post");
                    setTime(time);
                    setLoggedInUserProfilePicUrl("profilePicUrl " + index);
                    setImageUrl("imageUrl " + index);
                    setLikeCount(index);
                    setCommentList(new ArrayList<>());
                }})
                .collect(Collectors.toList());
    }

    public static List<PostCreateBindingModel> getPostCreateBindingModels(int count) {
        return IntStream.range(0, count)
                .mapToObj(index -> new PostCreateBindingModel() {{
                    setContent("post " + index + " content");
                    setLoggedInUserId("loggedInUserId" + index);
                    setTimelineUserId("timelineUserId" + index);
                    setImageUrl("ImageUrl" + index);
                }})
                .collect(Collectors.toList());
    }
}

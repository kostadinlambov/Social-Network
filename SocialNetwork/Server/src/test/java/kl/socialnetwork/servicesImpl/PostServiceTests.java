package kl.socialnetwork.servicesImpl;


import kl.socialnetwork.domain.entities.Comment;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;
import kl.socialnetwork.repositories.PostRepository;
import kl.socialnetwork.services.PostService;
import kl.socialnetwork.testUtils.CommentsUtils;
import kl.socialnetwork.testUtils.PostsUtils;
import kl.socialnetwork.testUtils.UsersUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostServiceTests {

    @Autowired
    private PostService postService;

    @MockBean
    private PostRepository mockPostRepository;


    private List<Post> postList;

    @Before
    public void setUpTest() {
        postList = new ArrayList<>();
        when(mockPostRepository.findAllByTimelineUserIdOrderByTimeDesc("1"))
                .thenReturn(postList);
    }

    @Test
    public void getAllPosts_when2Posts_2Posts() {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        List<Post> posts = PostsUtils.getPosts(2, users.get(0), users.get(1));

        List<Comment> comments = CommentsUtils.getComments(2, users.get(0), users.get(1), posts.get(0));
        posts.get(0).getCommentList().addAll(comments);
        posts.get(1).getCommentList().add(comments.get(1));
        posts.get(1).getCommentList().add(comments.get(0));
        posts.get(1).getCommentList().add(comments.get(0));

        postList.addAll(posts);

        // Act
        List<PostServiceModel> allPosts = postService.getAllPosts("1");

        // Assert
        Post expected = posts.get(0);
        PostServiceModel actual = allPosts.get(0);

        assertEquals(2, allPosts.size());
        assertEquals(expected.getContent(), actual.getContent());
        assertEquals(expected.getImageUrl(), actual.getImageUrl());
        assertEquals(expected.getTime(), actual.getTime());
        assertEquals(expected.getLoggedInUser().getId(), actual.getLoggedInUser().getId());
    }
}

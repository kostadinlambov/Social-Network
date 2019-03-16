package kl.socialnetwork.services;

public interface LikeService {

    boolean addLike(String postId, String loggedInUserId);

    int getAllLikesForPost(String postId);
}

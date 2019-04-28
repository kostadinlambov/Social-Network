import { registerReducer, loginReducer, registerErrorReducer, loginErrorReducer } from './authReducer';
import { ajaxStatusReducer, ajaxErrorReducer } from './ajaxReducer';
import { fetchPictureReducer } from './pictureReducer';
import { fetchAllChatFriendsReducer, loggedInUserDataReducer, timeLineUserDataReducer, fetchAllFriendsReducer } from './userReducer';
import { fetchAllMessagesReducer } from './messagesReducer';
import { createPostReducer, fetchAllPostsReducer, removePostReducer, addLikePostReducer } from './postReducer';
import { createCommentReducer, removeCommentReducer, addLikeCommentReducer } from './commentReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    registerError: registerErrorReducer,
    loginError: loginErrorReducer,
    ajaxStatus: ajaxStatusReducer,
    ajaxError: ajaxErrorReducer,
    fetchPictures: fetchPictureReducer,
    fetchAllChatFriends: fetchAllChatFriendsReducer,
    loggedInUserData: loggedInUserDataReducer,
    timeLineUserData: timeLineUserDataReducer,
    fetchAllMessages: fetchAllMessagesReducer,
    fetchAllFriends: fetchAllFriendsReducer,
    createPost: createPostReducer,
    fetchAllPosts: fetchAllPostsReducer,
    removePost: removePostReducer,
    removeComment: removeCommentReducer,
    addLikePost: addLikePostReducer,
    addLikeComment: addLikeCommentReducer,
    createComment: createCommentReducer,
};
import { registerReducer, loginReducer, registerErrorReducer, loginErrorReducer,  } from './authReducer';
import { ajaxStatusReducer, ajaxErrorReducer } from './ajaxReducer';
import { fetchPictureReducer } from './pictureReducer';
import { fetchAllChatFriendsReducer, loggedInUserDataReducer, timeLineUserDataReducer, fetchAllFriendsReducer, updateUserReducer } from './userReducer';
import { fetchAllMessagesReducer } from './messagesReducer';
import { createPostReducer, fetchAllPostsReducer, removePostReducer, addLikePostReducer } from './postReducer';
import { createCommentReducer, removeCommentReducer, addLikeCommentReducer } from './commentReducer';

export default {
    ajaxStatus: ajaxStatusReducer,
    ajaxError: ajaxErrorReducer,
    register: registerReducer,
    login: loginReducer,
    registerError: registerErrorReducer,
    loginError: loginErrorReducer,
    updateUserData: updateUserReducer,
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
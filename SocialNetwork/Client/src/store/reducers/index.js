import { registerReducer, loginReducer, registerErrorReducer, loginErrorReducer, } from './authReducer';
import { ajaxStatusReducer, ajaxErrorReducer } from './ajaxReducer';
import { addPictureReducer, removePictureReducer, fetchPictureReducer, changePictureReducer } from './pictureReducer';
import {
    fetchAllChatFriendsReducer, loggedInUserDataReducer, timeLineUserDataReducer, fetchAllFriendsReducer,
    updateUserReducer, fetchAllUsersReducer, promoteUserReducer, demoteUserReducer, changeTimeLineUserDataReducer,
    changeAllFriendsReducer,
} from './userReducer';
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
    fetchAllUsers: fetchAllUsersReducer,
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
    promoteUserData: promoteUserReducer,
    demoteUserData: demoteUserReducer,
    changeTimeLineUserData: changeTimeLineUserDataReducer,
    changeAllFriends: changeAllFriendsReducer,
    changePicture: changePictureReducer,
    addPicture: addPictureReducer,
    removePicture: removePictureReducer,
};
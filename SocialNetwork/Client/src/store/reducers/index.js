import { registerReducer, loginReducer, registerErrorReducer, loginErrorReducer, } from './authReducer';
import { ajaxStatusReducer, ajaxErrorReducer } from './ajaxReducer';
import { addPictureReducer, removePictureReducer, fetchPictureReducer, changePictureReducer } from './pictureReducer';
import {
    fetchAllChatFriendsReducer, loggedInUserDataReducer, timeLineUserDataReducer, fetchAllFriendsReducer,
    updateUserReducer, fetchAllUsersReducer, promoteUserReducer, demoteUserReducer, changeTimeLineUserDataReducer,
    changeAllFriendsReducer,removeFriendReducer, deleteUserReducer, findFriendsReducer, addfriendReducer, 
    cancelRequestReducer, confirmRequestReducer, searchResultsReducer,
} from './userReducer';
import { fetchAllMessagesReducer, fetchAllUnreadMessagesReducer, triggerMessageLoadReducer } from './messagesReducer';
import { createPostReducer, fetchAllPostsReducer, removePostReducer, addLikePostReducer } from './postReducer';
import { createCommentReducer, removeCommentReducer, addLikeCommentReducer } from './commentReducer';
import { fetchAllLogsReducer, findLogsByUserNameReducer, clearLogsByUserNameReducer, clearAllLogsReducer } from './logsReducer';

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
    fetchAllUnreadMessages: fetchAllUnreadMessagesReducer,
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
    fetchAllLogs: fetchAllLogsReducer,
    findLogsByUserName: findLogsByUserNameReducer,
    clearLogsByUserName: clearLogsByUserNameReducer,
    clearAllLogs: clearAllLogsReducer,
    removeFriend: removeFriendReducer,
    deleteUser: deleteUserReducer,
    findFriends: findFriendsReducer,
    addfriend: addfriendReducer,
    cancelRequest: cancelRequestReducer,
    confirmRequest: confirmRequestReducer,
    searchResults: searchResultsReducer,
    triggerMessageLoad: triggerMessageLoadReducer,
};
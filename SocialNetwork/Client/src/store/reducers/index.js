import { registerReducer, loginReducer, registerErrorReducer, loginErrorReducer } from './authReducer';
import { ajaxStatusReducer, ajaxErrorReducer } from './ajaxReducer';
import { fetchPictureReducer } from './pictureReducer';
import { fetchAllChatFriendsReducer, loggedInUserDataReducer, timeLineUserDataReducer, fetchAllFriendsReducer } from './userReducer';
import { fetchAllMessagesReducer } from './messagesReducer';
import { fetchAllPostsReducer } from './postReducer';

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
    fetchAllPosts: fetchAllPostsReducer,
};
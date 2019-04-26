import { registerReducer, loginReducer, registerErrorReducer, loginErrorReducer } from './authReducer';
import { ajaxStatusReducer, ajaxErrorReducer } from './ajaxReducer';
import { fetchPictureReducer } from './pictureReducer';
import { fetchAllChatFriendsReducer } from './userReducer';
import { fetchAllMessagesReducer } from './messagesReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    registerError: registerErrorReducer,
    loginError: loginErrorReducer,
    ajaxStatus: ajaxStatusReducer,
    ajaxError: ajaxErrorReducer,
    fetchPictures: fetchPictureReducer,
    fetchAllChatFriends: fetchAllChatFriendsReducer,
    fetchAllMessages: fetchAllMessagesReducer
};
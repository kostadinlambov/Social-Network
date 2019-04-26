import { requester } from '../../infrastructure';
import { FETCH_ALLCHATFRIENDS_BEGIN, FETCH_ALLCHATFRIENDS_SUCCESS, FETCH_ALLCHATFRIENDS_ERROR, EDIT_USERSTATUS } from './actionTypes';

const fetchAllChatFriendsSuccess = (friendsChatArr) => {
    return {
        type: FETCH_ALLCHATFRIENDS_SUCCESS,
        payload: friendsChatArr
    }
}

const fetchAllChatFriendsBegin = () => {
    return {
        type: FETCH_ALLCHATFRIENDS_BEGIN,
    }
}

const fetchAllChatFriendsError = (error, message, status, path) => {
    return {
        type: FETCH_ALLCHATFRIENDS_ERROR,
        error,
        message,
        status,
        path,
    }
}

const fetchAllChatFriendsAction = (userId) => {
    return (dispatch) => {
        dispatch(fetchAllChatFriendsBegin())
        return requester.get(`/relationship/friends/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchAllChatFriendsError(error, message, status, path));
            } else {
                dispatch(fetchAllChatFriendsSuccess(response));
            }
        }).catch(err => {
            debugger;
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchAllChatFriendsError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}


const updateUserStatusAction = (userData) => {
    return {
        type: EDIT_USERSTATUS,
        payload: userData
    }
}


export { fetchAllChatFriendsAction, updateUserStatusAction };
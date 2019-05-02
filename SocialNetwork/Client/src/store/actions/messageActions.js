import { requester } from '../../infrastructure';
import {
    FETCH_ALLMESSAGES_SUCCESS, FETCH_ALLMESSAGES_BEGIN, FETCH_ALLMESSAGES_ERROR, ADD_MESSAGE,
    FETCH_UNREADMESSAGES_SUCCESS, FETCH_UNREADMESSAGES_BEGIN, FETCH_UNREADMESSAGES_ERROR, LOAD_USER_MESSAGES,
} from './actionTypes';

// fetchAllMessages
const fetchAllMessagesSuccess = (allMessages) => {
    return {
        type: FETCH_ALLMESSAGES_SUCCESS,
        payload: allMessages
    }
}

const fetchAllMessagesBegin = () => {
    return {
        type: FETCH_ALLMESSAGES_BEGIN,
    }
}

const fetchAllMessagesError = (error, message, status, path) => {
    return {
        type: FETCH_ALLMESSAGES_ERROR,
        error,
        message,
        status,
        path,
    }
}

const fetchAllMessagesAction = (chatUserId) => {
    return (dispatch) => {
        dispatch(fetchAllMessagesBegin())
        return requester.get('/message/all/' + chatUserId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchAllMessagesError(error, message, status, path));
            } else {
                dispatch(fetchAllMessagesSuccess(response));
                dispatch(fetchAllUnreadMessagesAction());
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchAllMessagesError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

const addMessageAction = (messageBody) => {
    return {
        type: ADD_MESSAGE,
        payload: messageBody
    }
}

// fetchAllUnreadMessages
const fetchAllUnreadMessagesSuccess = (allUnreadMessages) => {
    return {
        type: FETCH_UNREADMESSAGES_SUCCESS,
        payload: allUnreadMessages
    }
}

const fetchAllUnreadMessagesBegin = () => {
    return {
        type: FETCH_UNREADMESSAGES_BEGIN,
    }
}

const fetchAllUnreadMessagesError = (error, message, status, path) => {
    return {
        type: FETCH_UNREADMESSAGES_ERROR,
        error,
        message,
        status,
        path,
    }
}

const fetchAllUnreadMessagesAction = () => {
    return (dispatch) => {
        dispatch(fetchAllUnreadMessagesBegin())
        return requester.get('/message/friend', (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchAllUnreadMessagesError(error, message, status, path));
            } else {
                dispatch(fetchAllUnreadMessagesSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchAllUnreadMessagesError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// LoadUserMessages and showUserChatBox
const triggerMessageLoadAction = (userData) => {
    return {
        type: LOAD_USER_MESSAGES,
        payload: userData
    }
}

export { fetchAllMessagesAction, addMessageAction, fetchAllUnreadMessagesAction, triggerMessageLoadAction };
import { requester } from '../../infrastructure';
import { FETCH_ALLMESSAGES_SUCCESS, FETCH_ALLMESSAGES_BEGIN, FETCH_ALLMESSAGES_ERROR, ADD_MESSAGE } from './actionTypes';

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

const fetchAllMessagesError = (error, message, status, path) =>  {
    return {
        type: FETCH_ALLMESSAGES_ERROR,
        error,
        message,
        status,
        path,
    }
}

const fetchAllMessagesAction = (chatUserId) =>  {
    return (dispatch) => {
        dispatch(fetchAllMessagesBegin())
        return requester.get('/message/all/' + chatUserId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchAllMessagesError(error, message, status, path));
            } else {
                dispatch(fetchAllMessagesSuccess(response));
            }
        }).catch(err => {
            debugger;
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchAllMessagesError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

const addMessageAction = (messageBody) => {
    return{
        type: ADD_MESSAGE,
        payload: messageBody
    }
}

export { fetchAllMessagesAction, addMessageAction };
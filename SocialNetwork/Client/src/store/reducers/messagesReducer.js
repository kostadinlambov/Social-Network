import {
    FETCH_ALLMESSAGES_BEGIN, FETCH_ALLMESSAGES_SUCCESS, FETCH_ALLMESSAGES_ERROR, ADD_MESSAGE,
    FETCH_UNREADMESSAGES_SUCCESS, FETCH_UNREADMESSAGES_BEGIN, FETCH_UNREADMESSAGES_ERROR, 
    LOAD_USER_MESSAGES,
} from '../actions/actionTypes';

// fetchAllMessagesReducer
const initialStateAllChatFriends = {
    allMessagesArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function fetchAllMessagesReducer(state = initialStateAllChatFriends, action) {
    switch (action.type) {
        case FETCH_ALLMESSAGES_BEGIN:
            return Object.assign({}, state, {
                allMessagesArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_ALLMESSAGES_SUCCESS:
            return Object.assign({}, state, {
                allMessagesArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_ALLMESSAGES_ERROR:
            return Object.assign({}, state, {
                allMessagesArr: [],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        case ADD_MESSAGE:
            return Object.assign({}, state, {
                allMessagesArr: [...state.allMessagesArr, action.payload],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        default:
            return state

    }
}

// fetchAllUnreadMessagesReducer
const initialStateAllUnreadMessages = {
    allUnreadMessages: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function fetchAllUnreadMessagesReducer(state = initialStateAllUnreadMessages, action) {
    switch (action.type) {
        case FETCH_UNREADMESSAGES_BEGIN:
            return Object.assign({}, state, {
                allUnreadMessages: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_UNREADMESSAGES_SUCCESS:
            return Object.assign({}, state, {
                allUnreadMessages: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_UNREADMESSAGES_ERROR:
            return Object.assign({}, state, {
                allUnreadMessages: [],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        default:
            return state

    }
}

// triggerMessageLoadAction
function triggerMessageLoadReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_USER_MESSAGES:
            return action.payload;
        default:
            return state;
    }
}

export {
    fetchAllMessagesReducer, fetchAllUnreadMessagesReducer, triggerMessageLoadReducer,
}
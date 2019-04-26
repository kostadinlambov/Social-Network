import { FETCH_ALLMESSAGES_BEGIN, FETCH_ALLMESSAGES_SUCCESS, FETCH_ALLMESSAGES_ERROR, ADD_MESSAGE } from '../actions/actionTypes';
import { addMessageAction } from '../actions/messageActions';

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

// const addMessage = (state, data) => {
//     const { id, online } = data;

//     const newFriendsChatArr = state.friendsChatArr.map((friend) => {
//         if (friend.id !== id) {
//             return friend
//         }

//         return {
//             ...friend, online
//         }
//     })

//     return Object.assign({}, state, {
//         friendsChatArr: [...newFriendsChatArr],
//         hasError: false,
//         error: '',
//         message: '',
//         status: '',
//         path: '',
//         loading: false,
//     })
// }

export {
    fetchAllMessagesReducer,
}
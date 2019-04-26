import { FETCH_ALLCHATFRIENDS_BEGIN, FETCH_ALLCHATFRIENDS_SUCCESS, FETCH_ALLCHATFRIENDS_ERROR, EDIT_USERSTATUS } from '../actions/actionTypes';

const initialStateAllChatFriends = {
    friendsChatArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function fetchAllChatFriendsReducer(state = initialStateAllChatFriends, action) {
    switch (action.type) {
        case FETCH_ALLCHATFRIENDS_BEGIN:
            return Object.assign({}, state, {
                friendsChatArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_ALLCHATFRIENDS_SUCCESS:
            return Object.assign({}, state, {
                friendsChatArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_ALLCHATFRIENDS_ERROR:
            return Object.assign({}, state, {
                friendsChatArr: [],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        case EDIT_USERSTATUS:
            return updateUserStatus(state, action.payload)
        default:
            return state

    }


}

const updateUserStatus = (state, data) => {
    const {id, online } = data;

    const newFriendsChatArr = state.friendsChatArr.map((friend) => {
        if (friend.id !== id) {
            return friend
        }

        return {
            ...friend, online
        }
    })

    return Object.assign({}, state, {
        friendsChatArr: [...newFriendsChatArr],
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })
}


function reconcile(oldData, newData) {
    const newDataById = {}
    for (const entry of newData) {
        newDataById[entry._id] = entry
    }

    const result = []
    for (const entry of oldData) {
        if (newDataById[entry._id]) {
            result.push(newDataById[entry._id])
            delete newDataById[entry._id]
        } else {
            result.push(entry)
        }
    }

    for (const entryId in newDataById) {
        result.push(newDataById[entryId])
    }

    return result
}

export {
    fetchAllChatFriendsReducer,
}
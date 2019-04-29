import {
    FETCH_LOGGEDIN_USERDATA_BEGIN, FETCH_LOGGEDIN_USERDATA_SUCCESS, FETCH_LOGGEDIN_USERDATA_ERROR, UPDATE_LOGGEDIN_USERDATA,
    FETCH_TIMELINE_USERDATA_BEGIN, FETCH_TIMELINE_USERDATA_SUCCESS, FETCH_TIMELINE_USERDATA_ERROR, UPDATE_TIMELINE_USERDATA,
    FETCH_ALLCHATFRIENDS_BEGIN, FETCH_ALLCHATFRIENDS_SUCCESS, FETCH_ALLCHATFRIENDS_ERROR, EDIT_USERSTATUS,
    FETCH_ALLFRIENDS_BEGIN, FETCH_ALLFRIENDS_SUCCESS, FETCH_ALLFRIENDS_ERROR,
    UPDATE_USER_SUCCESS, UPDATE_USER_BEGIN, UPDATE_USER_ERROR,
} from '../actions/actionTypes';

import placeholder_user_image from '../../assets/images/placeholder.png';
import default_background_image from '../../assets/images/default-background-image.jpg';


const initialStateLoggedInUserData = {
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    search: '',
    category: '',
    profilePicUrl: placeholder_user_image,
    backgroundImageUrl: default_background_image,
    authority: '',
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const loggedInUserDataReducer = (state = initialStateLoggedInUserData, action) => {
    switch (action.type) {
        case FETCH_LOGGEDIN_USERDATA_BEGIN:
            return Object.assign({},
                state,
                initialStateLoggedInUserData,
                { loading: true }
            )
        case FETCH_LOGGEDIN_USERDATA_SUCCESS:
            return Object.assign({},
                state,
                action.payload,
                {
                    hasError: false,
                    error: '',
                    message: '',
                    status: '',
                    path: '',
                    loading: false,
                }
            )
        case FETCH_LOGGEDIN_USERDATA_ERROR:
            return Object.assign({},
                state,
                initialStateLoggedInUserData,
                {
                    hasError: true,
                    error: action.error,
                    message: action.message,
                    status: action.status,
                    path: action.path,
                    loading: false,
                }
            )
        case UPDATE_LOGGEDIN_USERDATA:
            return {
                ...state,
                ...action.payload,
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            };
        default:
            return state
    }
}

const initialStateTimeLineUserData = {
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    search: '',
    category: '',
    profilePicUrl: placeholder_user_image,
    backgroundImageUrl: default_background_image,
    authority: '',
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const timeLineUserDataReducer = (state = initialStateTimeLineUserData, action) => {
    switch (action.type) {
        case FETCH_TIMELINE_USERDATA_BEGIN:
            return Object.assign({},
                state,
                initialStateTimeLineUserData,
                { loading: true }
            )
        case FETCH_TIMELINE_USERDATA_SUCCESS:
            return Object.assign({},
                state,
                action.payload,
                {
                    hasError: false,
                    error: '',
                    message: '',
                    status: '',
                    path: '',
                    loading: false,
                }
            )
        case FETCH_TIMELINE_USERDATA_ERROR:
            return Object.assign({},
                state,
                initialStateTimeLineUserData,
                {
                    hasError: true,
                    error: action.error,
                    message: action.message,
                    status: action.status,
                    path: action.path,
                    loading: false,
                }
            )
        case UPDATE_TIMELINE_USERDATA:
            return {
                ...state,
                ...action.payload,
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            };
        default:
            return state
    }
}

const initialStateAllChatFriends = {
    friendsChatArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const fetchAllChatFriendsReducer = (state = initialStateAllChatFriends, action) => {
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
    const { id, online } = data;

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

const initialStateAllFriends = {
    friendsArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const fetchAllFriendsReducer = (state = initialStateAllFriends, action) => {
    switch (action.type) {
        case FETCH_ALLFRIENDS_BEGIN:
            return Object.assign({}, state, {
                friendsArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_ALLFRIENDS_SUCCESS:
            return Object.assign({}, state, {
                friendsArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_ALLFRIENDS_ERROR:
            return Object.assign({}, state, {
                friendsArr: [],
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


const initialStateUpdateUser = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const updateUserReducer = (state = initialStateUpdateUser, action) => {
    switch (action.type) {
        case UPDATE_USER_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case UPDATE_USER_ERROR:
            return Object.assign({}, state, {
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

const reconcile = (oldData, newData) => {
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
    loggedInUserDataReducer,
    timeLineUserDataReducer,
    fetchAllFriendsReducer,
    updateUserReducer
}
import {
    FETCH_LOGGEDIN_USERDATA_BEGIN, FETCH_LOGGEDIN_USERDATA_SUCCESS, FETCH_LOGGEDIN_USERDATA_ERROR, UPDATE_LOGGEDIN_USERDATA,
    FETCH_TIMELINE_USERDATA_BEGIN, FETCH_TIMELINE_USERDATA_SUCCESS, FETCH_TIMELINE_USERDATA_ERROR, UPDATE_TIMELINE_USERDATA,
    FETCH_ALLCHATFRIENDS_BEGIN, FETCH_ALLCHATFRIENDS_SUCCESS, FETCH_ALLCHATFRIENDS_ERROR, EDIT_USERSTATUS,
    FETCH_ALLFRIENDS_BEGIN, FETCH_ALLFRIENDS_SUCCESS, FETCH_ALLFRIENDS_ERROR,
    UPDATE_USER_SUCCESS, UPDATE_USER_BEGIN, UPDATE_USER_ERROR,
    FETCH_ALLUSERS_SUCCESS, FETCH_ALLUSERS_BEGIN, FETCH_ALLUSERS_ERROR,
    PROMOTE_USER_SUCCESS, PROMOTE_USER_BEGIN, PROMOTE_USER_ERROR,
    DEMOTE_USER_SUCCESS, DEMOTE_USER_BEGIN, DEMOTE_USER_ERROR, CHANGE_USERROLE,
    CHANGE_TIMELINE_USERDATA_SUCCESS, CHANGE_TIMELINE_USERDATA_BEGIN, CHANGE_TIMELINE_USERDATA_ERROR,
    CHANGE_ALLFRIENDS_SUCCESS, CHANGE_ALLFRIENDS_BEGIN, CHANGE_ALLFRIENDS_ERROR, UPDATE_ALL_FRIENDS,
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
            case  UPDATE_ALL_FRIENDS:
            return  Object.assign({}, state, {
                friendsArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
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

const initialStateAllUsers = {
    userArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const fetchAllUsersReducer = (state = initialStateAllUsers, action) => {
    switch (action.type) {
        case FETCH_ALLUSERS_BEGIN:
            return Object.assign({}, state, {
                userArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_ALLUSERS_SUCCESS:
            return Object.assign({}, state, {
                userArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_ALLUSERS_ERROR:
            return Object.assign({}, state, {
                userArr: [],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        case CHANGE_USERROLE:
            return updateUserRole(state, action.payload)
        default:
            return state
    }
}

const updateUserRole = (state, data) => {
    const { id, role } = data;

    const newUserArr = state.userArr.map((user) => {
        if (user.id !== id) {
            return user
        }

        return {
            ...user, role
        }
    })

    return Object.assign({}, state, {
        userArr: [...newUserArr],
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })
}

const initialStatePromoteUser = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const promoteUserReducer = (state = initialStatePromoteUser, action) => {
    switch (action.type) {
        case PROMOTE_USER_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case PROMOTE_USER_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case PROMOTE_USER_ERROR:
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

const initialStateDemoteUser = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const demoteUserReducer = (state = initialStateDemoteUser, action) => {
    switch (action.type) {
        case DEMOTE_USER_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case DEMOTE_USER_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case DEMOTE_USER_ERROR:
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

const initialStateChangeTimeLineUserData = {
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

const changeTimeLineUserDataReducer = (state = initialStateChangeTimeLineUserData, action) => {
    switch (action.type) {
        case CHANGE_TIMELINE_USERDATA_BEGIN:
            return Object.assign({},
                state,
                initialStateTimeLineUserData,
                { loading: true }
            )
        case CHANGE_TIMELINE_USERDATA_SUCCESS:
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
        case CHANGE_TIMELINE_USERDATA_ERROR:
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
        default:
            return state
    }
}

const initialStateChangeAllFriends = {
    friendsArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const changeAllFriendsReducer = (state = initialStateChangeAllFriends, action) => {
    switch (action.type) {
        case CHANGE_ALLFRIENDS_BEGIN:
            return Object.assign({}, state, {
                friendsArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case CHANGE_ALLFRIENDS_SUCCESS:
            return Object.assign({}, state, {
                friendsArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case CHANGE_ALLFRIENDS_ERROR:
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
    updateUserReducer,
    fetchAllUsersReducer,
    promoteUserReducer,
    demoteUserReducer,
    changeTimeLineUserDataReducer,
    changeAllFriendsReducer,
}
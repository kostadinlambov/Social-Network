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
    REMOVE_FRIEND_SUCCESS, REMOVE_FRIEND_BEGIN, REMOVE_FRIEND_ERROR,
    DELETE_USER_SUCCESS, DELETE_USER_BEGIN, DELETE_USER_ERROR,
    FIND_FRIENDS_SUCCESS, FIND_FRIENDS_BEGIN, FIND_FRIENDS_ERROR,
    ADD_FRIEND_SUCCESS, ADD_FRIEND_BEGIN, ADD_FRIEND_ERROR,
    CANCEL_REQUEST_SUCCESS, CANCEL_REQUEST_BEGIN, CANCEL_REQUEST_ERROR,
    CONFIRM_REQUEST_SUCCESS, CONFIRM_REQUEST_BEGIN, CONFIRM_REQUEST_ERROR,
    SEARCH_RESULTS_SUCCESS, SEARCH_RESULTS_BEGIN, SEARCH_RESULTS_ERROR,
} from '../actions/actionTypes';

import placeholder_user_image from '../../assets/images/placeholder.png';
import default_background_image from '../../assets/images/default-background-image.jpg';

// loggedInUserDataReducer
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

// timeLineUserDataReducer
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

// fetchAllChatFriendsReducer
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

// updateUserReducer
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

// fetchAllUsersReducer
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
        case DELETE_USER_SUCCESS:
            return removeUser(state, action.deletedUserId)
        default:
            return state
    }
}

const removeUser = (state, deletedUserId) => {
    const userArr = state.userArr.filter(user => user.id !== deletedUserId);

    return Object.assign({}, state, {
        userArr: [...userArr],
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })
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

// deleteUser
const initialStateDeleteUser = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const deleteUserReducer = (state = initialStateDeleteUser, action) => {
    switch (action.type) {
        case DELETE_USER_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case DELETE_USER_ERROR:
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

// promoteUserReducer
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

// demoteUserReducer
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

// changeTimeLineUserDataReducer
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

// fetchAllFriendsReducer
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
        case UPDATE_ALL_FRIENDS:
            return Object.assign({}, state, {
                friendsArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case REMOVE_FRIEND_SUCCESS:
            return Object.assign({}, state, {
                friendsArr: removeFriend(state, action.friendToRemoveId),
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

const removeFriend = (state, friendToRemoveId) => {
    return state.friendsArr.filter(friend => friend.id !== friendToRemoveId);
}

// changeAllFriendsReducer
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

// removeFriendReducer
const initialStateRemoveFriend = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const removeFriendReducer = (state = initialStateRemoveFriend, action) => {
    switch (action.type) {
        case REMOVE_FRIEND_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case REMOVE_FRIEND_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case REMOVE_FRIEND_ERROR:
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

// findFriends
const initialStateFindFriends = {
    friendsCandidatesArr: [],
    userWaitingForAcceptingRequest: [],
    usersReceivedRequestFromCurrentUser: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const findFriendsReducer = (state = initialStateFindFriends, action) => {
    switch (action.type) {
        case FIND_FRIENDS_BEGIN:
            return Object.assign({}, state, {
                friendsCandidatesArr: [],
                userWaitingForAcceptingRequest: [],
                usersReceivedRequestFromCurrentUser: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FIND_FRIENDS_SUCCESS:
            return setFindFriendsSuccessState(state, action.payload)
        case FIND_FRIENDS_ERROR:
            return Object.assign({}, state, {
                friendsCandidatesArr: [],
                userWaitingForAcceptingRequest: [],
                usersReceivedRequestFromCurrentUser: [],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        case ADD_FRIEND_SUCCESS:
            return sendUserRequest(state, action.friendCandidateId);
        case CANCEL_REQUEST_SUCCESS:
            return cancelRequest(state, action.friendToRejectId);
        case CONFIRM_REQUEST_SUCCESS:
            return confirmRequest(state, action.friendToAcceptId);
        default:
            return state
    }
}

const setFindFriendsSuccessState = (state, response) => {
    const friendsCandidatesArr = response.filter(user => user.status !== 0 && user.status !== 1);
    const userWaitingForAcceptingRequest = response.filter(user => user.status === 0 && user.starterOfAction === true);
    const usersReceivedRequestFromCurrentUser = response.filter(user => user.status === 0 && user.starterOfAction === false);

    return Object.assign({}, state, {
        friendsCandidatesArr: friendsCandidatesArr,
        userWaitingForAcceptingRequest: userWaitingForAcceptingRequest,
        usersReceivedRequestFromCurrentUser: usersReceivedRequestFromCurrentUser,
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })
}

const sendUserRequest = (state, friendCandidateId) => {
    const userToAddIndex = state.friendsCandidatesArr.findIndex(user => user.id === friendCandidateId);
    const userToAdd = state.friendsCandidatesArr[userToAddIndex];

    const friendsCandidatesArr = state.friendsCandidatesArr.filter(user => user.id !== friendCandidateId);
    const usersReceivedRequestFromCurrentUser = [...state.usersReceivedRequestFromCurrentUser, userToAdd]

    return Object.assign({}, state, {
        friendsCandidatesArr: friendsCandidatesArr,
        userWaitingForAcceptingRequest: state.userWaitingForAcceptingRequest.slice(),
        usersReceivedRequestFromCurrentUser: usersReceivedRequestFromCurrentUser,
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })

}

const cancelRequest = (state, friendToRejectId) => {
    let friendsCandidatesArr = state.friendsCandidatesArr.slice();
    let userWaitingForAcceptingRequest = state.userWaitingForAcceptingRequest.slice();
    let usersReceivedRequestFromCurrentUser = state.usersReceivedRequestFromCurrentUser.slice();

    let userToCancelIndex = usersReceivedRequestFromCurrentUser.findIndex(user => user.id === friendToRejectId);

    if (userToCancelIndex > -1) {
        const userToCancel = usersReceivedRequestFromCurrentUser[userToCancelIndex];
        usersReceivedRequestFromCurrentUser = usersReceivedRequestFromCurrentUser.filter(user => user.id !== friendToRejectId);
        friendsCandidatesArr = [...friendsCandidatesArr, userToCancel]
    } else {
        userToCancelIndex = userWaitingForAcceptingRequest.findIndex(user => user.id === friendToRejectId);
        const userToCancel = userWaitingForAcceptingRequest[userToCancelIndex];
        userWaitingForAcceptingRequest = userWaitingForAcceptingRequest.filter(user => user.id !== friendToRejectId);
        friendsCandidatesArr = [...friendsCandidatesArr, userToCancel]
    }

    return Object.assign({}, state, {
        friendsCandidatesArr,
        userWaitingForAcceptingRequest,
        usersReceivedRequestFromCurrentUser,
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })

}

const confirmRequest = (state, friendToAcceptId) => {
    const userWaitingForAcceptingRequest = state.userWaitingForAcceptingRequest.filter(user => user.id !== friendToAcceptId);

    return Object.assign({}, state, {
        friendsCandidatesArr: state.friendsCandidatesArr.slice(),
        userWaitingForAcceptingRequest,
        usersReceivedRequestFromCurrentUser: state.usersReceivedRequestFromCurrentUser.slice(),
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })

}

// addFriend
const initialStateAddFriend = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const addfriendReducer = (state = initialStateAddFriend, action) => {
    switch (action.type) {
        case ADD_FRIEND_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case ADD_FRIEND_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case ADD_FRIEND_ERROR:
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

// cancelRequest
const initialStateCancelRequest = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const cancelRequestReducer = (state = initialStateCancelRequest, action) => {
    switch (action.type) {
        case CANCEL_REQUEST_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case CANCEL_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case CANCEL_REQUEST_ERROR:
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

// confirmRequestReducer
const initialStateConfirmRequest = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const confirmRequestReducer = (state = initialStateConfirmRequest, action) => {
    switch (action.type) {
        case CONFIRM_REQUEST_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case CONFIRM_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case CONFIRM_REQUEST_ERROR:
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

// searchResults
const initialStateSearchResults = {
    friendsArrSearch: [],
    friendsCandidatesArr: [],
    userWaitingForAcceptingRequest: [],
    usersReceivedRequestFromCurrentUser: [],
    search: '',
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const searchResultsReducer = (state = initialStateSearchResults, action) => {
    switch (action.type) {
        case SEARCH_RESULTS_BEGIN:
            return Object.assign({}, state, {
                friendsArrSearch: [],
                friendsCandidatesArr: [],
                userWaitingForAcceptingRequest: [],
                usersReceivedRequestFromCurrentUser: [],
                search: '',
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case SEARCH_RESULTS_SUCCESS:
            return setSearchResultsSuccessState(state, action.payload, action.search)
        case SEARCH_RESULTS_ERROR:
            return Object.assign({}, state, {
                friendsArrSearch: [],
                friendsCandidatesArr: [],
                userWaitingForAcceptingRequest: [],
                usersReceivedRequestFromCurrentUser: [],
                search: action.search,
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        case ADD_FRIEND_SUCCESS:
            return searchResultsSendUserRequest(state, action.friendCandidateId);
        case CANCEL_REQUEST_SUCCESS:
            return searchResultsCancelRequest(state, action.friendToRejectId);
        case CONFIRM_REQUEST_SUCCESS:
            return searchResultsConfirmRequest(state, action.friendToAcceptId);
        case REMOVE_FRIEND_SUCCESS:
            return searchResultsRemoveFriend(state, action.friendToRemoveId)
        default:
            return state
    }
}

const setSearchResultsSuccessState = (state, response, search) => {
    const friendsArrSearch = response.filter(user => user.status === 1);
    const friendsCandidatesArr = response.filter(user => user.status !== 0 && user.status !== 1);
    const userWaitingForAcceptingRequest = response.filter(user => user.status === 0 && user.starterOfAction === true);
    const usersReceivedRequestFromCurrentUser = response.filter(user => user.status === 0 && user.starterOfAction === false);

    return Object.assign({}, state, {
        friendsArrSearch,
        friendsCandidatesArr,
        userWaitingForAcceptingRequest,
        usersReceivedRequestFromCurrentUser,
        search,
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })
}

const searchResultsSendUserRequest = (state, friendCandidateId) => {
    const userToAddIndex = state.friendsCandidatesArr.findIndex(user => user.id === friendCandidateId);

    if (userToAddIndex > -1) {
        const userToAdd = state.friendsCandidatesArr[userToAddIndex];

        const friendsCandidatesArr = state.friendsCandidatesArr.filter(user => user.id !== friendCandidateId);
        const usersReceivedRequestFromCurrentUser = [...state.usersReceivedRequestFromCurrentUser, userToAdd]

        return Object.assign({}, state, {
            friendsArrSearch: state.friendsArrSearch.slice(),
            friendsCandidatesArr: friendsCandidatesArr,
            userWaitingForAcceptingRequest: state.userWaitingForAcceptingRequest.slice(),
            usersReceivedRequestFromCurrentUser: usersReceivedRequestFromCurrentUser,
            search: state.search,
            hasError: false,
            error: '',
            message: '',
            status: '',
            path: '',
            loading: false,
        })
    } else {
        return state;
    }

}

const searchResultsCancelRequest = (state, friendToRejectId) => {
    let friendsArrSearch = state.friendsArrSearch.slice();
    let friendsCandidatesArr = state.friendsCandidatesArr.slice();
    let userWaitingForAcceptingRequest = state.userWaitingForAcceptingRequest.slice();
    let usersReceivedRequestFromCurrentUser = state.usersReceivedRequestFromCurrentUser.slice();

    let userToCancelIndex = usersReceivedRequestFromCurrentUser.findIndex(user => user.id === friendToRejectId);

    if (userToCancelIndex > -1) {
        const userToCancel = usersReceivedRequestFromCurrentUser[userToCancelIndex];
        usersReceivedRequestFromCurrentUser = usersReceivedRequestFromCurrentUser.filter(user => user.id !== friendToRejectId);
        friendsCandidatesArr = [...friendsCandidatesArr, userToCancel]
    } else {
        userToCancelIndex = userWaitingForAcceptingRequest.findIndex(user => user.id === friendToRejectId);
        const userToCancel = userWaitingForAcceptingRequest[userToCancelIndex];
        userWaitingForAcceptingRequest = userWaitingForAcceptingRequest.filter(user => user.id !== friendToRejectId);
        friendsCandidatesArr = [...friendsCandidatesArr, userToCancel]
    }

    return Object.assign({}, state, {
        friendsArrSearch,
        friendsCandidatesArr,
        userWaitingForAcceptingRequest,
        usersReceivedRequestFromCurrentUser,
        search: state.search,
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })

}

const searchResultsConfirmRequest = (state, friendToAcceptId) => {
    let friendsArrSearch = state.friendsArrSearch.slice();

    const userToAcceptIndex = state.userWaitingForAcceptingRequest.findIndex(user => user.id === friendToAcceptId);

    if (userToAcceptIndex > -1) {
        const userToAccept = state.userWaitingForAcceptingRequest[userToAcceptIndex];

        friendsArrSearch = [...friendsArrSearch, userToAccept];
        const userWaitingForAcceptingRequest = state.userWaitingForAcceptingRequest.filter(user => user.id !== friendToAcceptId);

        return Object.assign({}, state, {
            friendsArrSearch,
            friendsCandidatesArr: state.friendsCandidatesArr.slice(),
            userWaitingForAcceptingRequest,
            usersReceivedRequestFromCurrentUser: state.usersReceivedRequestFromCurrentUser.slice(),
            search: state.search,
            hasError: false,
            error: '',
            message: '',
            status: '',
            path: '',
            loading: false,
        })
    } else {
        return state;
    }
}

const searchResultsRemoveFriend = (state, friendToRemoveId) => {
    let friendsArrSearch = state.friendsArrSearch.slice();

    const userToRemoveIndex = friendsArrSearch.findIndex(user => user.id === friendToRemoveId);

    if (userToRemoveIndex > -1) {
        const userToRemove = friendsArrSearch[userToRemoveIndex];
        friendsArrSearch = state.friendsArrSearch.filter(friend => friend.id !== friendToRemoveId)

        const friendsCandidatesArr = [...state.friendsCandidatesArr, userToRemove]

        return Object.assign({}, state, {
            friendsArrSearch,
            friendsCandidatesArr,
            userWaitingForAcceptingRequest: state.userWaitingForAcceptingRequest,
            usersReceivedRequestFromCurrentUser: state.usersReceivedRequestFromCurrentUser,
            search: state.search,
            hasError: false,
            error: '',
            message: '',
            status: '',
            path: '',
            loading: false,
        })
    } else {
        return state;
    }


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
    removeFriendReducer,
    deleteUserReducer,
    findFriendsReducer,
    addfriendReducer,
    cancelRequestReducer,
    confirmRequestReducer,
    searchResultsReducer,
}
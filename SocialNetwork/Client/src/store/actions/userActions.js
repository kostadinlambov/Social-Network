import { requester } from '../../infrastructure';
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

} from './actionTypes';

import { fetchPicturesAction } from './pictureActions'

// fetchAllChatFriends

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

const updateUserStatusAction = (userData) => {
    return {
        type: EDIT_USERSTATUS,
        payload: userData
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

// fetchLoggedInUser

const fetchLoggedInUserSuccess = (userData) => {
    return {
        type: FETCH_LOGGEDIN_USERDATA_SUCCESS,
        payload: userData
    }
}

const fetchLoggedInUserBegin = () => {
    return {
        type: FETCH_LOGGEDIN_USERDATA_BEGIN,
    }
}

const fetchLoggedInUserError = (error, message, status, path) => {
    return {
        type: FETCH_LOGGEDIN_USERDATA_ERROR,
        error,
        message,
        status,
        path,
    }
}

const updateLoggedInUserDataAction = (userData) => {
    return {
        type: UPDATE_LOGGEDIN_USERDATA,
        payload: userData
    }
}

const fetchLoggedInUserAction = (userId) => {
    return (dispatch) => {
        dispatch(fetchLoggedInUserBegin())
        return requester.get(`/users/details/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchLoggedInUserError(error, message, status, path));
            } else {
                dispatch(fetchLoggedInUserSuccess(response));
                // dispatch(fetchPicturesAction(userId));
                // // dispatch(fetchFriendsAction(userId));
                // dispatch(fetchAllChatFriendsAction(userId));

                // this.setState({
                //     ...userData, ready: true
                // }, () => {
                //     (() => this.loadAllPictures(getUserToShowId))();
                //     (() => this.loadAllFriends(getUserToShowId))();
                //     (() => this.loadAllChatFriends())();
                // })

            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchLoggedInUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// fetchTimeLineUser

const fetchTimeLineUserSuccess = (userData) => {
    return {
        type: FETCH_TIMELINE_USERDATA_SUCCESS,
        payload: userData
    }
}

const fetchTimeLineUserBegin = () => {
    return {
        type: FETCH_TIMELINE_USERDATA_BEGIN,
    }
}

const fetchTimeLineUserError = (error, message, status, path) => {
    return {
        type: FETCH_TIMELINE_USERDATA_ERROR,
        error,
        message,
        status,
        path,
    }
}

const updateTimeLineUserDataAction = (userData) => {
    return {
        type: UPDATE_TIMELINE_USERDATA,
        payload: userData
    }
}

const fetchTimeLineUserAction = (userId) => {
    return (dispatch) => {
        dispatch(fetchTimeLineUserBegin())
        return requester.get(`/users/details/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchTimeLineUserError(error, message, status, path));
            } else {
                dispatch(fetchTimeLineUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchTimeLineUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// changeCurrentTimeLineUser
const changeCurrentTimeLineUserSuccess = (userData) => {
    return {
        type: CHANGE_TIMELINE_USERDATA_SUCCESS,
        payload: userData
    }
}

const changeCurrentTimeLineUserBegin = () => {
    return {
        type: CHANGE_TIMELINE_USERDATA_BEGIN,
    }
}

const changeCurrentTimeLineUserError = (error, message, status, path) => {
    return {
        type: CHANGE_TIMELINE_USERDATA_ERROR,
        error,
        message,
        status,
        path,
    }
}

const changeCurrentTimeLineUserAction = (userId) => {
    return (dispatch) => {
        dispatch(changeCurrentTimeLineUserBegin())
        return requester.get(`/users/details/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(changeCurrentTimeLineUserError(error, message, status, path));
            } else {
                dispatch(updateTimeLineUserDataAction(response));
                dispatch(changeCurrentTimeLineUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(changeCurrentTimeLineUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// fetchAllFriends
const fetchAllFriendsSuccess = (friendsArr) => {
    return {
        type: FETCH_ALLFRIENDS_SUCCESS,
        payload: friendsArr
    }
}

const fetchAllFriendsBegin = () => {
    return {
        type: FETCH_ALLFRIENDS_BEGIN,
    }
}

const fetchAllFriendsError = (error, message, status, path) => {
    return {
        type: FETCH_ALLFRIENDS_ERROR,
        error,
        message,
        status,
        path,
    }
}

const fetchAllFriendsAction = (userId) => {
    return (dispatch) => {
        dispatch(fetchAllFriendsBegin())
        return requester.get(`/relationship/friends/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchAllFriendsError(error, message, status, path));
            } else {
                dispatch(fetchAllFriendsSuccess(response));
                // (() => this.loadAllChatFriends())())
            }
        }).catch(err => {
            debugger;
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchAllFriendsError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// changeAllFriends
const changeAllFriendsSuccess = (friendsArr) => {
    return {
        type: CHANGE_ALLFRIENDS_SUCCESS,
        payload: friendsArr
    }
}

const changeAllFriendsBegin = () => {
    return {
        type: CHANGE_ALLFRIENDS_BEGIN,
    }
}

const changeAllFriendsError = (error, message, status, path) => {
    return {
        type: CHANGE_ALLFRIENDS_ERROR,
        error,
        message,
        status,
        path,
    }
}

const updateAllFriendsAction = (friendsArr) => {
    return {
        type: UPDATE_ALL_FRIENDS,
        payload: friendsArr
    }
}

const changeAllFriendsAction = (userId) => {
    return (dispatch) => {
        dispatch(changeAllFriendsBegin())
        return requester.get(`/relationship/friends/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(changeAllFriendsError(error, message, status, path));
            } else {
                dispatch(updateAllFriendsAction(response));
                dispatch(changeAllFriendsSuccess(response));
                // (() => this.loadAllChatFriends())())
            }
        }).catch(err => {
            debugger;
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(changeAllFriendsError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}



// update User
const updateUserSuccess = (response) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: response
    }
}

const updateUserBegin = () => {
    return {
        type: UPDATE_USER_BEGIN,
    }
}

const updateUserError = (error, message, status, path) => {
    return {
        type: UPDATE_USER_ERROR,
        error,
        message,
        status,
        path,
    }
}

const updateUserAction = (loggedInUserId, otherProps) => {
    const timeLineUserId = otherProps.id;

    return (dispatch) => {
        dispatch(updateUserBegin())
        return requester.put('/users/update/' + loggedInUserId, { ...otherProps }, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(updateUserError(error, message, status, path));
            } else {
                dispatch(updateTimeLineUserDataAction(otherProps));
                if (loggedInUserId === timeLineUserId) {
                    dispatch(updateLoggedInUserDataAction(otherProps));
                }
                dispatch(updateUserSuccess(response));
            }
        }).catch(err => {
            debugger;
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(updateUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// fetchAllUsers
const fetchAllUsersSuccess = (userArr) => {
    return {
        type: FETCH_ALLUSERS_SUCCESS,
        payload: userArr
    }
}

const fetchAllUsersBegin = () => {
    return {
        type: FETCH_ALLUSERS_BEGIN,
    }
}

const fetchAllUsersError = (error, message, status, path) => {
    return {
        type: FETCH_ALLUSERS_ERROR,
        error,
        message,
        status,
        path,
    }
}

const fetchAllUsersAction = (loggedInUserId) => {
    return (dispatch) => {
        dispatch(fetchAllUsersBegin())
        return requester.get('/users/all/' + loggedInUserId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchAllUsersError(error, message, status, path));
            } else {
                dispatch(fetchAllUsersSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchAllUsersError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}


// updateUserRole
const updateUserRoleAction = (data) => {
    return {
        type: CHANGE_USERROLE,
        payload: data
    }
}

// promoteUser
const promoteUserSuccess = (userArr) => {
    return {
        type: PROMOTE_USER_SUCCESS,
        payload: userArr
    }
}

const promoteUserBegin = () => {
    return {
        type: PROMOTE_USER_BEGIN,
    }
}

const promoteUserError = (error, message, status, path) => {
    return {
        type: PROMOTE_USER_ERROR,
        error,
        message,
        status,
        path,
    }
}

const promoteUserAction = (userId) => {
    return (dispatch) => {
        dispatch(promoteUserBegin())
        return requester.post('/users/promote?id=' + userId, userId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(promoteUserError(error, message, status, path));
            } else {
                dispatch(updateUserRoleAction({ role: 'ADMIN', id: userId }));
                dispatch(promoteUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(promoteUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// demoteUser
const demoteUserSuccess = (userArr) => {
    return {
        type: DEMOTE_USER_SUCCESS,
        payload: userArr
    }
}

const demoteUserBegin = () => {
    return {
        type: DEMOTE_USER_BEGIN,
    }
}

const demoteUserError = (error, message, status, path) => {
    return {
        type: DEMOTE_USER_ERROR,
        error,
        message,
        status,
        path,
    }
}

const demoteUserAction = (userId) => {
    return (dispatch) => {
        dispatch(demoteUserBegin())
        return requester.post('/users/demote?id=' + userId, userId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(demoteUserError(error, message, status, path));
            } else {
                dispatch(updateUserRoleAction({ role: 'USER', id: userId }));
                dispatch(demoteUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(demoteUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

export {
    fetchAllChatFriendsAction,
    updateUserStatusAction,
    fetchLoggedInUserAction,
    updateLoggedInUserDataAction,
    fetchTimeLineUserAction,
    updateTimeLineUserDataAction,
    fetchAllFriendsAction,
    updateUserAction,
    fetchAllUsersAction,
    promoteUserAction,
    demoteUserAction,
    updateUserRoleAction,
    changeCurrentTimeLineUserAction,
    changeAllFriendsAction,
};
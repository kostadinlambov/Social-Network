import { requester } from '../../infrastructure';
import {
    FETCH_LOGGEDIN_USERDATA_BEGIN, FETCH_LOGGEDIN_USERDATA_SUCCESS, FETCH_LOGGEDIN_USERDATA_ERROR, UPDATE_LOGGEDIN_USERDATA,
    FETCH_TIMELINE_USERDATA_BEGIN, FETCH_TIMELINE_USERDATA_SUCCESS, FETCH_TIMELINE_USERDATA_ERROR, UPDATE_TIMELINE_USERDATA,
    FETCH_ALLCHATFRIENDS_BEGIN, FETCH_ALLCHATFRIENDS_SUCCESS, FETCH_ALLCHATFRIENDS_ERROR, EDIT_USERSTATUS,
    FETCH_ALLFRIENDS_BEGIN, FETCH_ALLFRIENDS_SUCCESS, FETCH_ALLFRIENDS_ERROR, 
    UPDATE_USER_SUCCESS, UPDATE_USER_BEGIN, UPDATE_USER_ERROR,
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
            debugger;
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
                // dispatch(fetchPicturesAction(userId));
                // dispatch(fetchFriendsAction(userId));
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
            
            console.log('fetchTimeLineUserAction Err: ',  err)
            debugger;
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchTimeLineUserError('', `Error: ${err.message}`, err.status, ''));
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
                if(loggedInUserId === timeLineUserId){
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

export { 
    fetchAllChatFriendsAction, 
    updateUserStatusAction, 
    fetchLoggedInUserAction, 
    updateLoggedInUserDataAction, 
    fetchTimeLineUserAction, 
    updateTimeLineUserDataAction ,
    fetchAllFriendsAction,
    updateUserAction,
};
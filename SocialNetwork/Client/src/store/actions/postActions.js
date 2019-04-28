import { requester } from '../../infrastructure';
import {
    FETCH_ALLPOSTS_BEGIN, FETCH_ALLPOSTS_SUCCESS, FETCH_ALLPOSTS_ERROR,
    REMOVE_POST_BEGIN, REMOVE_POST_SUCCESS, REMOVE_POST_ERROR,
    ADDLIKE_POST_SUCCESS, ADDLIKE_POST_BEGIN, ADDLIKE_POST_ERROR,
    CREATE_POST_SUCCESS, CREATE_POST_BEGIN, CREATE_POST_ERROR
} from './actionTypes';

// createPost
const createPostSuccess = (response) => {
    return {
        type: CREATE_POST_SUCCESS,
        payload: response
    }
}

const createPostBegin = () => {
    return {
        type: CREATE_POST_BEGIN,
    }
}

const createPostError = (error, message, status, path) => {
    return {
        type: CREATE_POST_ERROR,
        error,
        message,
        status,
        path,
    }
}

const createPostAction = (timelineUserId, loggedInUserId, content, imageUrl) => {
    const requestBody = { timelineUserId, loggedInUserId, content, imageUrl }
    return (dispatch) => {
        dispatch(createPostBegin())
        return requester.post('/post/create', requestBody, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(createPostError(error, message, status, path));
            } else {
                dispatch(createPostSuccess(response));
                dispatch(fetchAllPostsAction(timelineUserId))
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(createPostError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// fetchAllPosts
const fetchAllPostsSuccess = (allPostsArr) => {
    return {
        type: FETCH_ALLPOSTS_SUCCESS,
        payload: allPostsArr
    }
}

const fetchAllPostsBegin = () => {
    return {
        type: FETCH_ALLPOSTS_BEGIN,
    }
}

const fetchAllPostsError = (error, message, status, path) => {
    return {
        type: FETCH_ALLPOSTS_ERROR,
        error,
        message,
        status,
        path,
    }
}

const fetchAllPostsAction = (userId) => {
    return (dispatch) => {
        dispatch(fetchAllPostsBegin())
        return requester.get('/post/all/' + userId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchAllPostsError(error, message, status, path));
            } else {
                dispatch(fetchAllPostsSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchAllPostsError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// removePost
const removePostSuccess = (response) => {
    return {
        type: REMOVE_POST_SUCCESS,
        payload: response
    }
}

const removePostBegin = () => {
    return {
        type: REMOVE_POST_BEGIN,
    }
}

const removePostError = (error, message, status, path) => {
    return {
        type: REMOVE_POST_ERROR,
        error,
        message,
        status,
        path,
    }
}

const removePostAction = (loggedInUserId, postToRemoveId, timelineUserId) => {
    const requestBody = { loggedInUserId, postToRemoveId }
    return (dispatch) => {
        dispatch(removePostBegin())
        return requester.post('/post/remove', requestBody, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(removePostError(error, message, status, path));
            } else {
                dispatch(removePostSuccess(response));
                dispatch(fetchAllPostsAction(timelineUserId))
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(removePostError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// addLike

const addLikePostSuccess = (response) => {
    return {
        type: ADDLIKE_POST_SUCCESS,
        payload: response
    }
}

const addLikePostBegin = () => {
    return {
        type: ADDLIKE_POST_BEGIN,
    }
}

const addLikePostError = (error, message, status, path) => {
    return {
        type: ADDLIKE_POST_ERROR,
        error,
        message,
        status,
        path,
    }
}

const addLikePostAction = (loggedInUserId, postId, timelineUserId) => {
    const requestBody = { postId, loggedInUserId }
    return (dispatch) => {
        dispatch(addLikePostBegin())
        return requester.post('/like/add', requestBody, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(addLikePostError(error, message, status, path));
            } else {
                dispatch(addLikePostSuccess(response));
                dispatch(fetchAllPostsAction(timelineUserId))
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(addLikePostError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

export { createPostAction, fetchAllPostsAction, removePostAction, addLikePostAction, };
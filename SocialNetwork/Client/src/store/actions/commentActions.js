import { requester } from '../../infrastructure';
import {
    REMOVE_COMMENT_BEGIN, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_ERROR,
    ADDLIKE_COMMENT_SUCCESS, ADDLIKE_COMMENT_BEGIN, ADDLIKE_COMMENT_ERROR,
    CREATE_COMMENT_SUCCESS, CREATE_COMMENT_BEGIN, CREATE_COMMENT_ERROR,
} from './actionTypes';

import { fetchAllPostsAction } from './postActions'

// createComment
const createCommentSuccess = (response) => {
    return {
        type: CREATE_COMMENT_SUCCESS,
        payload: response
    }
}

const createCommentBegin = () => {
    return {
        type: CREATE_COMMENT_BEGIN,
    }
}

const createCommentError = (error, message, status, path) => {
    return {
        type: CREATE_COMMENT_ERROR,
        error,
        message,
        status,
        path,
    }
}

const createCommentAction = (postId, loggedInUserId, timelineUserId, content, imageUrl) => {
    const requestBody = { postId, loggedInUserId, timelineUserId, content, imageUrl }
    return (dispatch) => {
        dispatch(createCommentBegin())
        return requester.post('/comment/create', requestBody, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(createCommentError(error, message, status, path));
            } else {
                dispatch(createCommentSuccess(response));
                dispatch(fetchAllPostsAction(timelineUserId))
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(createCommentError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// removeComment
const removeCommentSuccess = (response) => {
    return {
        type: REMOVE_COMMENT_SUCCESS,
        payload: response
    }
}

const removeCommentBegin = () => {
    return {
        type: REMOVE_COMMENT_BEGIN,
    }
}

const removeCommentError = (error, message, status, path) => {
    return {
        type: REMOVE_COMMENT_ERROR,
        error,
        message,
        status,
        path,
    }
}

const removeCommentAction = (loggedInUserId, commentToRemoveId, timelineUserId) => {
    const requestBody = { loggedInUserId, commentToRemoveId }
    return (dispatch) => {
        dispatch(removeCommentBegin())
        return requester.post('/comment/remove', requestBody, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(removeCommentError(error, message, status, path));
            } else {
                dispatch(removeCommentSuccess(response));
                dispatch(fetchAllPostsAction(timelineUserId))
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(removeCommentError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// addLike
const addLikeCommentSuccess = (response) => {
    return {
        type: ADDLIKE_COMMENT_SUCCESS,
        payload: response
    }
}

const addLikeCommentBegin = () => {
    return {
        type: ADDLIKE_COMMENT_BEGIN,
    }
}

const addLikeCommentError = (error, message, status, path) => {
    return {
        type: ADDLIKE_COMMENT_ERROR,
        error,
        message,
        status,
        path,
    }
}

const addLikeCommentAction = (loggedInUserId, commentId, timelineUserId) => {
    const requestBody = { commentId, loggedInUserId }
    return (dispatch) => {
        dispatch(addLikeCommentBegin())
        return requester.post('/like/comment', requestBody, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(addLikeCommentError(error, message, status, path));
            } else {
                dispatch(addLikeCommentSuccess(response));
                dispatch(fetchAllPostsAction(timelineUserId))
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(addLikeCommentError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}


export { createCommentAction, removeCommentAction, addLikeCommentAction, };
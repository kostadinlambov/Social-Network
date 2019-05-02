import {
    REMOVE_COMMENT_BEGIN, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_ERROR,
    ADDLIKE_COMMENT_SUCCESS, ADDLIKE_COMMENT_BEGIN, ADDLIKE_COMMENT_ERROR,
    CREATE_COMMENT_SUCCESS, CREATE_COMMENT_BEGIN, CREATE_COMMENT_ERROR,
} from '../actions/actionTypes';


// createCommentReducer
const initialStateCreateComment = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const createCommentReducer = (state = initialStateCreateComment, action) => {
    switch (action.type) {
        case CREATE_COMMENT_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case CREATE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case CREATE_COMMENT_ERROR:
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

// removeCommentReducer
const initialStateRemoveComment = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const removeCommentReducer = (state = initialStateRemoveComment, action) => {
    switch (action.type) {
        case REMOVE_COMMENT_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case REMOVE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case REMOVE_COMMENT_ERROR:
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

// addLikeCommentReducer
const initialStateAddLikeComment = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const addLikeCommentReducer = (state = initialStateAddLikeComment, action) => {
    switch (action.type) {
        case ADDLIKE_COMMENT_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case ADDLIKE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case ADDLIKE_COMMENT_ERROR:
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

export { createCommentReducer, removeCommentReducer, addLikeCommentReducer }
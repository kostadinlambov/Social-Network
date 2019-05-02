import {
    FETCH_ALLPOSTS_BEGIN, FETCH_ALLPOSTS_SUCCESS, FETCH_ALLPOSTS_ERROR,
    REMOVE_POST_BEGIN, REMOVE_POST_SUCCESS, REMOVE_POST_ERROR,
    ADDLIKE_POST_SUCCESS, ADDLIKE_POST_BEGIN, ADDLIKE_POST_ERROR,
    CREATE_POST_SUCCESS, CREATE_POST_BEGIN, CREATE_POST_ERROR
} from '../actions/actionTypes';

// createPostReducer
const initialStateCreatePost = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const createPostReducer = (state = initialStateCreatePost, action) => {
    switch (action.type) {
        case CREATE_POST_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case CREATE_POST_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case CREATE_POST_ERROR:
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

// fetchAllPostsReducer
const initialStateAllPosts = {
    allPostsArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const fetchAllPostsReducer = (state = initialStateAllPosts, action) => {
    switch (action.type) {
        case FETCH_ALLPOSTS_BEGIN:
            return Object.assign({}, state, {
                allPostsArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_ALLPOSTS_SUCCESS:
            return Object.assign({}, state, {
                allPostsArr: [...action.payload],
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_ALLPOSTS_ERROR:
            return Object.assign({}, state, {
                allPostsArr: [],
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

const initialStateRemovePost = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

// removePostReducer
const removePostReducer = (state = initialStateRemovePost, action) => {
    switch (action.type) {
        case REMOVE_POST_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case REMOVE_POST_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case REMOVE_POST_ERROR:
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

const initialStateAddLikePost = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

// addLikePostReducer
const addLikePostReducer = (state = initialStateAddLikePost, action) => {
    switch (action.type) {
        case ADDLIKE_POST_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case ADDLIKE_POST_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case ADDLIKE_POST_ERROR:
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

export { createPostReducer, fetchAllPostsReducer, removePostReducer, addLikePostReducer }
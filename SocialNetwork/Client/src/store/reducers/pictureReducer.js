import {
    ADD_PICTURE_SUCCESS, ADD_PICTURE_BEGIN, ADD_PICTURE_ERROR,
    REMOVE_PICTURE_SUCCESS, REMOVE_PICTURE_BEGIN, REMOVE_PICTURE_ERROR,
    FETCH_PICTURE_SUCCESS, FETCH_PICTURE_BEGIN, FETCH_PICTURE_ERROR,
    CHANGE_PICTURES_SUCCESS, CHANGE_PICTURES_BEGIN, CHANGE_PICTURES_ERROR, UPDATE_PICTURES,
} from '../actions/actionTypes';

// addPictureReducer
const initialStateAddPicture = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function addPictureReducer(state = initialStateAddPicture, action) {
    switch (action.type) {
        case ADD_PICTURE_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case ADD_PICTURE_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case ADD_PICTURE_ERROR:
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

// removePictureReducer
const initialStateRemovePicture = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function removePictureReducer(state = initialStateRemovePicture, action) {
    switch (action.type) {
        case REMOVE_PICTURE_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case REMOVE_PICTURE_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case REMOVE_PICTURE_ERROR:
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

// fetchPictureArrReducer
const initialStateFetchPicture = {
    picturesArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function fetchPictureReducer(state = initialStateFetchPicture, action) {
    switch (action.type) {
        case FETCH_PICTURE_BEGIN:
            return Object.assign({}, state, {
                picturesArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_PICTURE_SUCCESS:
            return Object.assign({}, state, {
                picturesArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_PICTURE_ERROR:
            return Object.assign({}, state, {
                picturesArr: [],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        case UPDATE_PICTURES:
            return Object.assign({}, state, {
                picturesArr: [...action.payload],
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

// changePictureReducer
const initialStateChangePicture = {
    picturesArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function changePictureReducer(state = initialStateChangePicture, action) {
    switch (action.type) {
        case CHANGE_PICTURES_BEGIN:
            return Object.assign({}, state, {
                picturesArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case CHANGE_PICTURES_SUCCESS:
            return Object.assign({}, state, {
                picturesArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case CHANGE_PICTURES_ERROR:
            return Object.assign({}, state, {
                picturesArr: [],
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

export {
    addPictureReducer, removePictureReducer, fetchPictureReducer, changePictureReducer
}
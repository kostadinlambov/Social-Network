import { FETCH_PICTURE_SUCCESS, FETCH_PICTURE_BEGIN, FETCH_PICTURE_ERROR } from '../actions/actionTypes';

const initialState = {
    picturesArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function fetchPictureReducer(state = initialState, action) {
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
        default:
            return state

    }
}

export {
    fetchPictureReducer,
}
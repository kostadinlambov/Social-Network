import { requester } from '../../infrastructure';
import {
    ADD_PICTURE_SUCCESS, ADD_PICTURE_BEGIN, ADD_PICTURE_ERROR,
    REMOVE_PICTURE_SUCCESS, REMOVE_PICTURE_BEGIN, REMOVE_PICTURE_ERROR,
    FETCH_PICTURE_SUCCESS, FETCH_PICTURE_BEGIN, FETCH_PICTURE_ERROR,
    CHANGE_PICTURES_SUCCESS, CHANGE_PICTURES_BEGIN, CHANGE_PICTURES_ERROR, UPDATE_PICTURES,
} from './actionTypes';

// addPicture
function addPictureSuccess(response) {
    return {
        type: ADD_PICTURE_SUCCESS,
        payload: response
    }
}

function addPictureBegin() {
    return {
        type: ADD_PICTURE_BEGIN,
    }
}

function addPictureError(error, message, status, path) {
    return {
        type: ADD_PICTURE_ERROR,
        error,
        message,
        status,
        path,
    }
}

function addPicturesAction(data, timeLineUserId) {
    return (dispatch) => {
        dispatch(addPictureBegin())
        return requester.addPhoto('/pictures/add', data, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(addPictureError(error, message, status, path));
            } else {
                dispatch(changeAllPicturesAction(timeLineUserId));
                dispatch(addPictureSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(addPictureError('', `Error: ${err.message}`, err.status, ''));
        })
    }
};

// removePicture
function removePictureSuccess(response) {
    return {
        type: REMOVE_PICTURE_SUCCESS,
        payload: response
    }
}

function removePictureBegin() {
    return {
        type: REMOVE_PICTURE_BEGIN,
    }
}

function removePictureError(error, message, status, path) {
    return {
        type: REMOVE_PICTURE_ERROR,
        error,
        message,
        status,
        path,
    }
}

function removePictureAction(loggedInUserId, photoToRemoveId, timeLineUserId) {
    const requestBody = { loggedInUserId, photoToRemoveId }
    return (dispatch) => {
        dispatch(removePictureBegin())
        return requester.post('/pictures/remove', requestBody, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(removePictureError(error, message, status, path));
            } else {
                dispatch(changeAllPicturesAction(timeLineUserId));
                dispatch(removePictureSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(removePictureError('', `Error: ${err.message}`, err.status, ''));
        })
    }
};

// fetchPictures
function fetchPictureSuccess(picturesArr) {
    return {
        type: FETCH_PICTURE_SUCCESS,
        payload: picturesArr
    }
}

function fetchPictureBegin() {
    return {
        type: FETCH_PICTURE_BEGIN,
    }
}

function fetchPictureError(error, message, status, path) {
    return {
        type: FETCH_PICTURE_ERROR,
        error,
        message,
        status,
        path,
    }
}

function fetchPicturesAction(userId) {
    return (dispatch) => {
        dispatch(fetchPictureBegin())
        return requester.get('/pictures/all/' + userId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchPictureError(error, message, status, path));
            } else {
                dispatch(fetchPictureSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchPictureError('', `Error: ${err.message}`, err.status, ''));
        })
    }
};


// changePicturesArr
function changePictureSuccess(picturesArr) {
    return {
        type: CHANGE_PICTURES_SUCCESS,
        payload: picturesArr
    }
}

function changePictureBegin() {
    return {
        type: CHANGE_PICTURES_BEGIN,
    }
}

function changePictureError(error, message, status, path) {
    return {
        type: CHANGE_PICTURES_ERROR,
        error,
        message,
        status,
        path,
    }
}

const updatePicturesAction = (picturesArr) => {
    return {
        type: UPDATE_PICTURES,
        payload: picturesArr
    }
}

function changeAllPicturesAction(userId) {
    return (dispatch) => {
        dispatch(changePictureBegin())
        return requester.get('/pictures/all/' + userId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(changePictureError(error, message, status, path));
            } else {
                dispatch(updatePicturesAction(response));
                dispatch(changePictureSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(changePictureError('', `Error: ${err.message}`, err.status, ''));
        })
    }
};

export { addPicturesAction, removePictureAction, fetchPicturesAction, changeAllPicturesAction };
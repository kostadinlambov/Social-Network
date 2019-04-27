import { requester } from '../../infrastructure';
import { FETCH_PICTURE_SUCCESS, FETCH_PICTURE_BEGIN, FETCH_PICTURE_ERROR } from './actionTypes';

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
                const { error, message, status, path } =  response;
                dispatch(fetchPictureError(error, message, status, path));
            } else {
                dispatch(fetchPictureSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                // this.props.history.push('/login');
            }
            // dispatch(ajaxError(`Error: ${err.message}`, err.status));
            dispatch(fetchPictureError('', `Error: ${err.message}`, err.status, ''));
        })
    }
};

export { fetchPicturesAction };
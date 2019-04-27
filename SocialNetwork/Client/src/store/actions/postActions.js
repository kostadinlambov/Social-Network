import { requester } from '../../infrastructure';
import { FETCH_ALLPOSTS_BEGIN, FETCH_ALLPOSTS_SUCCESS, FETCH_ALLPOSTS_ERROR } from './actionTypes';

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

// const updateUserStatusAction = (userData) => {
//     return {
//         type: EDIT_USERSTATUS,
//         payload: userData
//     }
// }

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

export { fetchAllPostsAction };
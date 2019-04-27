import { FETCH_ALLPOSTS_BEGIN, FETCH_ALLPOSTS_SUCCESS, FETCH_ALLPOSTS_ERROR } from '../actions/actionTypes';

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
                message: '',
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


const reconcile = (oldData, newData) => {
    const newDataById = {}
    for (const entry of newData) {
        newDataById[entry._id] = entry
    }

    const result = []
    for (const entry of oldData) {
        if (newDataById[entry._id]) {
            result.push(newDataById[entry._id])
            delete newDataById[entry._id]
        } else {
            result.push(entry)
        }
    }

    for (const entryId in newDataById) {
        result.push(newDataById[entryId])
    }

    return result
}

export { fetchAllPostsReducer }
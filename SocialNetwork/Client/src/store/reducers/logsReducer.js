import {
    FETCH_ALL_LOGS_SUCCESS, FETCH_ALL_LOGS_BEGIN, FETCH_ALL_LOGS_ERROR,
    FINDBYUSERNAME_LOGS_SUCCESS, FINDBYUSERNAME_LOGS_BEGIN, FINDBYUSERNAME_LOGS_ERROR,
    CLEARBYUSERNAME_LOGS_SUCCESS, CLEARBYUSERNAME_LOGS_BEGIN, CLEARBYUSERNAME_LOGS_ERROR,
    CLEAR_ALL_LOGS_SUCCESS, CLEAR_ALL_LOGS_BEGIN, CLEAR_ALL_LOGS_ERROR,
} from '../actions/actionTypes';

// fetchAllLogsReducer
const initialStateFetchAllLogs = {
    logsArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function fetchAllLogsReducer(state = initialStateFetchAllLogs, action) {
    switch (action.type) {
        case FETCH_ALL_LOGS_BEGIN:
            return Object.assign({}, state, {
                logsArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_ALL_LOGS_SUCCESS:
            return Object.assign({}, state, {
                logsArr: [...action.payload],
                hasError: false,
                error: '',
                message: 'All logs successfully loaded.',
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_ALL_LOGS_ERROR:
            return Object.assign({}, state, {
                logsArr: [],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        case CLEAR_ALL_LOGS_SUCCESS:
            return Object.assign({}, state, {
                logsArr: [],
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

// findLogsByUserNameReducer
const initialStateFindLogsByUserName = {
    logsArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function findLogsByUserNameReducer(state = initialStateFindLogsByUserName, action) {
    switch (action.type) {
        case FINDBYUSERNAME_LOGS_BEGIN:
            return Object.assign({}, state, {
                logsArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FINDBYUSERNAME_LOGS_SUCCESS:
            return Object.assign({}, state, {
                logsArr: [...action.payload],
                hasError: false,
                error: '',
                message: action.message,
                status: '',
                path: '',
                loading: false,
            })
        case FINDBYUSERNAME_LOGS_ERROR:
            return Object.assign({}, state, {
                logsArr: [],
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

// clearByUserNameReducer
const initialStateClearLogsByUserName = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function clearLogsByUserNameReducer(state = initialStateClearLogsByUserName, action) {
    switch (action.type) {
        case CLEARBYUSERNAME_LOGS_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case CLEARBYUSERNAME_LOGS_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case CLEARBYUSERNAME_LOGS_ERROR:
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

// clearAllLogsReducer
const initialStateClearAllLogs = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

function clearAllLogsReducer(state = initialStateClearAllLogs, action) {
    switch (action.type) {
        case CLEAR_ALL_LOGS_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case CLEAR_ALL_LOGS_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case CLEAR_ALL_LOGS_ERROR:
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

export {
    fetchAllLogsReducer, findLogsByUserNameReducer, clearLogsByUserNameReducer, clearAllLogsReducer
}
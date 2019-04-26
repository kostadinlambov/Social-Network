import { AJAX_BEGIN, AJAX_END, AJAX_ERROR, AJAX_SUCCESS } from './actionTypes';

function ajaxBegin() {
    return {
        type: AJAX_BEGIN
    }
}

function ajaxEnd(){
    return {
        type: AJAX_END
    }
}

function ajaxError(error, message, status, path) {
    return {
        type: AJAX_ERROR,
        error,
        message,
        status,
        path,
    }
}

function ajaxSuccess(message) {
    return {
        type: AJAX_SUCCESS,
        message,
    }
}

export {
    ajaxBegin,
    ajaxEnd,
    ajaxError, 
    ajaxSuccess,
}

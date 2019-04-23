import { AJAX_BEGIN, AJAX_END } from './actionTypes';

function beginAjax() {
    return {
        type: AJAX_BEGIN
    }
}

function endAjax(){
    return {
        type: AJAX_END
    }
}

export {
    beginAjax,
    endAjax,
}

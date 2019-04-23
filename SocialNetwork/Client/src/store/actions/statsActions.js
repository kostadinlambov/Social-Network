import { AJAX_BEGIN, AJAX_ERROR, FETCH_STATS_SUCCESS } from './actionTypes';
import { fetchStats } from '../api/remote';

function fetchSuccess(data) {
    return {
        type: FETCH_STATS_SUCCESS,
        data
    };
}

export function fetchStatsAction() {
    return async (dispatch) => {
        dispatch({ type: AJAX_BEGIN });
        const data = await fetchStats();
        dispatch(fetchSuccess(data));
    };
}
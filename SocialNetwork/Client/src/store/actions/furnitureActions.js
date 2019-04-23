import { AJAX_BEGIN, AJAX_ERROR, FETCH_PAGE_SUCCESS, CREATE_FURNITURE_SUCCESS } from './actionTypes';
import { fetchPage, fetchDetails, fetchSearchPage, createFurniture } from '../api/remote';

function fetchSuccess(data) {
    return {
        type: FETCH_PAGE_SUCCESS,
        data
    };
}

function createSuccess(data) {
    return {
        type: CREATE_FURNITURE_SUCCESS,
        data
    };
}

export function fetchPageAction(page) {
    return async (dispatch) => {
        dispatch({ type: AJAX_BEGIN });
        try {
            const data = await fetchPage(page);
            dispatch(fetchSuccess(data));
        } catch (error) {
            dispatch({
                type: AJAX_ERROR,
                error
            });
        }
    };
}

export function fetchDetailsAction(id) {
    return async (dispatch) => {
        dispatch({ type: AJAX_BEGIN });
        try {
            const data = await fetchDetails(id);
            dispatch(fetchSuccess([data]));
        } catch (error) {
            dispatch({
                type: AJAX_ERROR,
                error
            });
        }
    };
}

export function fetchSearchAction(query, page) {
    return async (dispatch) => {
        dispatch({ type: AJAX_BEGIN });
        try {
            const data = await fetchSearchPage(query, page);
            dispatch(fetchSuccess(data));
        } catch (error) {
            dispatch({
                type: AJAX_ERROR,
                error
            });
        }
    };
}

export function createAction(item) {
    return async (dispatch) => {
        dispatch({ type: AJAX_BEGIN });
        try {
            const data = await createFurniture(item);
            dispatch(createSuccess(data));
        } catch (error) {
            dispatch({
                type: AJAX_ERROR,
                error
            });
        }
    };
}
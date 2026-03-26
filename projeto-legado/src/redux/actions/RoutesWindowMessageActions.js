import { RoutesWindowMessageConstants } from '../../constants';
import { CrudActions } from "./AppActions";

export const fetchRoutesWindowMessage = (id, params) => (dispatch) => {
    return CrudActions._get(`v1/routes-window-details/${id}/messages`, {
        start: RoutesWindowMessageConstants.FETCH_ROUTES_WINDOW_MESSAGE,
        success: RoutesWindowMessageConstants.FETCH_ROUTES_WINDOW_MESSAGE_SUCCESS,
        failure: RoutesWindowMessageConstants.FETCH_ROUTES_WINDOW_MESSAGE_FAILURE,
    }, params, dispatch);
};

export const fetchRoutesWindowMessageUnread = (id, params) => (dispatch) => {
    return CrudActions._get(`v1/routes-window-details/${id}/messages/unread`, {
        start: RoutesWindowMessageConstants.GET_ROUTES_WINDOW_MESSAGE_UNREAD,
        success: RoutesWindowMessageConstants.GET_ROUTES_WINDOW_MESSAGE_UNREAD_SUCCESS,
        failure: RoutesWindowMessageConstants.GET_ROUTES_WINDOW_MESSAGE_UNREAD_FAILURE,
    }, params, dispatch);
};

export const postRoutesWindowMessage = (id, params) => (dispatch) => {
    return CrudActions._post(`v1/routes-window-details/${id}/messages`, {
        start: RoutesWindowMessageConstants.POST_ROUTES_WINDOWS,
        success: RoutesWindowMessageConstants.POST_ROUTES_WINDOWS_SUCCESS,
        failure: RoutesWindowMessageConstants.POST_ROUTES_WINDOWS_FAILURE,
    }, params, dispatch);
};

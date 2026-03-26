import { RoutesWindowsConstants } from '../../constants';
import { CrudActions } from "./AppActions";

export const fetchRoutesWindows = (params) => (dispatch) => {
    return CrudActions._get(`v1/routes-windows`, {
        start: RoutesWindowsConstants.FETCH_ROUTES_WINDOWS,
        success: RoutesWindowsConstants.FETCH_ROUTES_WINDOWS_SUCCESS,
        failure: RoutesWindowsConstants.FETCH_ROUTES_WINDOWS_FAILURE,
    }, params, dispatch);
};

export const getRoutesWindows = (id, params) => (dispatch) => {
    return CrudActions._get(`v1/routes-windows/${id}`, {
        start: RoutesWindowsConstants.GET_ROUTES_WINDOWS,
        success: RoutesWindowsConstants.GET_ROUTES_WINDOWS_SUCCESS,
        failure: RoutesWindowsConstants.GET_ROUTES_WINDOWS_FAILURE,
    }, params, dispatch);
};

export const getRoutesWindowsProgress = () => (dispatch) => {
    return CrudActions._get(`/v1/routes-windows/in-progress`, {
        start: RoutesWindowsConstants.GET_ROUTES_WINDOWS_IN_PROGRESS,
        success: RoutesWindowsConstants.GET_ROUTES_WINDOWS_IN_PROGRESS_SUCCESS,
        failure: RoutesWindowsConstants.GET_ROUTES_WINDOWS_IN_PROGRESS_FAILURE,
    }, undefined, dispatch);
};

export const getRoutesWindowsParams = (id, window, params) => (dispatch) => {
    return CrudActions._get(`v1/routes-windows/${id}/details/${window}`, {
        start: RoutesWindowsConstants.GET_ROUTES_WINDOWS_CONFLICTS,
        success: RoutesWindowsConstants.GET_ROUTES_WINDOWS_CONFLICTS_SUCCESS,
        failure: RoutesWindowsConstants.GET_ROUTES_WINDOWS_CONFLICTS_FAILURE,
    }, params, dispatch);
};

export const getRoutesWindowsZones = (id, zone, params) => (dispatch) => {
        return CrudActions._get(`v1/routes-windows/${id}/details/by-zone/${zone}`, {
            start: RoutesWindowsConstants.GET_ROUTES_WINDOWS_ZONE,
            success: RoutesWindowsConstants.GET_ROUTES_WINDOWS_ZONE_SUCCESS,
            failure: RoutesWindowsConstants.GET_ROUTES_WINDOWS_ZONE_FAILURE,
        }, params, dispatch);
    };

export const getRoutesWindowsSubmit = (id, zone, action) => (dispatch) => {
    return CrudActions._get(`v1/routes-windows/${id}/details/${zone}/submit/${action}`, {
        start: RoutesWindowsConstants.GET_ROUTES_WINDOWS_SUBMIT,
        success: RoutesWindowsConstants.GET_ROUTES_WINDOWS_SUBMIT_SUCCESS,
        failure: RoutesWindowsConstants.GET_ROUTES_WINDOWS_SUBMIT_FAILURE,
    }, undefined, dispatch)
};

export const getRoutesWindowsParam = (id, zone, param) => (dispatch) => {
    return CrudActions._get(`v1/routes-windows/${id}/details/${zone}/${param}`, {
        start: RoutesWindowsConstants.GET_ROUTES_WINDOWS_PARAM,
        success: RoutesWindowsConstants.GET_ROUTES_WINDOWS_PARAM_SUCCESS,
        failure: RoutesWindowsConstants.GET_ROUTES_WINDOWS_PARAM_FAILURE,
    }, undefined, dispatch)
};

export const getRoutesWindowsSub = (id) => (dispatch) => {
    return CrudActions._get(`v1/routes-windows/submit/${id}`, {
        start: RoutesWindowsConstants.GET_ROUTES_WINDOWS_SUB,
        success: RoutesWindowsConstants.GET_ROUTES_WINDOWS_SUB_SUCCESS,
        failure: RoutesWindowsConstants.GET_ROUTES_WINDOWS_SUB_FAILURE,
    }, undefined, dispatch)
};

export const getRoutesWindowsFinish = (id) => (dispatch) => {
    return CrudActions._get(`v1/routes-windows/finish/${id}`, {
        start: RoutesWindowsConstants.GET_ROUTES_WINDOWS_FINISH,
        success: RoutesWindowsConstants.GET_ROUTES_WINDOWS_FINISH_SUCCESS,
        failure: RoutesWindowsConstants.GET_ROUTES_WINDOWS_FINISH_FAILURE,
    }, undefined, dispatch)
};

export const getApprovedOriginals = (approve, id, params) => (dispatch) =>{
    return CrudActions._get(`/v1/routes-windows/${approve}/${id}`, {
        start: RoutesWindowsConstants.GET_APPROVED_ORIGINALS,
        success: RoutesWindowsConstants.GET_APPROVED_ORIGINALS_SUCCESS,
        failure: RoutesWindowsConstants.GET_APPROVED_ORIGINALS_FAILURE
    }, params, dispatch)
};

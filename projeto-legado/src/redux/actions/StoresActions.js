import StoresConstants from '../../constants/StoresConstants';
import { CrudService } from '../services/';

export const fetchStores = (params) => (dispatch) => {
    return CrudService._get({
        url: 'v1/stores',
        consts: {
            start: StoresConstants.FETCH_STORES,
            success: StoresConstants.FETCH_STORES_SUCCESS,
            failure: StoresConstants.FETCH_STORES_FAILURE,
        },
        params,
        dispatch
    });
};

export const fetchStoresAttendances = (id, action, params) => (dispatch) => {
    return CrudService._get({
        url: `v1/stores/${id}/attendances/${action}`,
        consts: {
            start: StoresConstants.FETCH_STORES_ATTENDANCES,
            success: StoresConstants.FETCH_STORES_ATTENDANCES_SUCCESS,
            failure: StoresConstants.FETCH_STORES_ATTENDANCES_FAILURE,
        },
        params,
        dispatch
    });
};

export const fetchStoresBillings = (id, action, limit, params) => (dispatch) => {
    return CrudService._get({
        url: `v1/stores/${id}/billings/${action}/${limit}`,
        consts: {
            start: StoresConstants.FETCH_STORES_BILLINGS,
            success: StoresConstants.FETCH_STORES_BILLINGS_SUCCESS,
            failure: StoresConstants.FETCH_STORES_BILLINGS_FAILURE,
        },
        params,
        dispatch
    });
};

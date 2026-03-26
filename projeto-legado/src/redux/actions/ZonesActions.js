import { ZonesConstants } from '../../constants';
import { CrudService } from '../services/';

export const findZones = params => (dispatch) => (
    CrudService._get({
        url: `v1/zones`,
        consts: {
            start: ZonesConstants.FIND_ZONES,
            success: ZonesConstants.FIND_ZONES_SUCCESS,
            failure: ZonesConstants.FIND_ZONES_FAILURE,
        },
        params,
        dispatch
    })
);

export const fetchZones = (id, params) => (dispatch) => {
    return CrudService._get({
        url: `v1/routes-windows/${id}/details/get-zones`,
        consts: {
            start: ZonesConstants.FETCH_ZONES,
            success: ZonesConstants.FETCH_ZONES_SUCCESS,
            failure: ZonesConstants.FETCH_ZONES_FAILURE,
        },
        params,
        dispatch
    });
};

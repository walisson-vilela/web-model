import { RegionConstants } from '../../constants';
import { CrudService } from '../services/';

export const fetchRegion = (region, params) => (dispatch) => {
    return CrudService._get({
        url: `v1/region-${region}`,
        consts: {
            start: RegionConstants.FETCH_REGION,
            success: RegionConstants.FETCH_REGION_SUCCESS,
            failure: RegionConstants.FETCH_REGION_FAILURE,
        },
        params,
        dispatch
    });
};

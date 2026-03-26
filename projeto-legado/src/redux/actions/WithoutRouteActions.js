import { WithoutRouteConstants } from '../../constants';
import { CrudService } from '../services/';

export const fetchWithoutRoute = (id, params = []) => (dispatch) => {

    params['enrollment'] = id;

    return CrudService._get({
        url: `v1/peoples`,
        consts: {
            start: WithoutRouteConstants.FETCH_WITHOUT_ROUTE,
            success: WithoutRouteConstants.FETCH_WITHOUT_ROUTE_SUCCESS,
            failure: WithoutRouteConstants.FETCH_WITHOUT_ROUTE_FAILURE,
        },
        params,
        dispatch
    });
};

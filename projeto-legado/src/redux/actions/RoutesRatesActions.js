import { RoutesRatesConstants } from '../../constants';
import { CrudService } from '../services/';

export const fetchRouteRates = (cityA, cityB, params) => (dispatch) => {
    return CrudService._get({
        url: `v1/route-rates?cities[]=${cityA}&cities[]=${cityB}`,
        consts: {
            start: RoutesRatesConstants.FETCH_ROUTES_VERSION_EVENTS,
            success: RoutesRatesConstants.FETCH_ROUTES_VERSION_EVENTS_SUCCESS,
            failure: RoutesRatesConstants.FETCH_ROUTES_VERSION_EVENTS_FAILURE,
        },
        params,
        dispatch
    });
};
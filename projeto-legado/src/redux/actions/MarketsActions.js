import { MarketsConstants } from '../../constants';
import { CrudService } from '../services/';

export const fetchMarkets = (service, params) => (dispatch) => {
    return CrudService._get({
        url: `v1/markets/${service}`,
        consts: {
            start: MarketsConstants.FETCH_MARKETS,
            success: MarketsConstants.FETCH_MARKETS_SUCCESS,
            failure: MarketsConstants.FETCH_MARKETS_FAILURE,
        },
        params,
        dispatch
    });
};

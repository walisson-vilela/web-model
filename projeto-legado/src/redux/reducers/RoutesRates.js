import { RoutesRatesConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case RoutesRatesConstants.FETCH_ROUTES_RATES:
            return {...state, results: {...def.results, isLoading: true}};

        case RoutesRatesConstants.FETCH_ROUTES_RATES_SUCCESS:
        case RoutesRatesConstants.FETCH_ROUTES_RATES_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

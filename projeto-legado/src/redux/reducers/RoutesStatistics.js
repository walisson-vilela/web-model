import { RoutesStatisticsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case RoutesStatisticsConstants.GET_ROUTES_STATISTICS:
            return {...state, results: {...def.results, isLoading: true}};

        case RoutesStatisticsConstants.GET_ROUTES_STATISTICS_SUCCESS:
        case RoutesStatisticsConstants.GET_ROUTES_STATISTICS_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

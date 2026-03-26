import { MarketsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case MarketsConstants.FETCH_MARKETS:
        case MarketsConstants.GET_MARKETS:
            return {...state, results: {...def.results, isLoading: true}};

        case MarketsConstants.FETCH_MARKETS_SUCCESS:
        case MarketsConstants.FETCH_MARKETS_FAILURE:
        case MarketsConstants.GET_MARKETS_SUCCESS:
        case MarketsConstants.GET_MARKETS_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

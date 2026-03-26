import { RoutesMarkersConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case RoutesMarkersConstants.POST_ROUTES_MARKERS:
            return {...state, results: {...def.results, isLoading: true}};

        case RoutesMarkersConstants.POST_ROUTES_MARKERS_SUCCESS:
        case RoutesMarkersConstants.POST_ROUTES_MARKERS_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

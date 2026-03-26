import { RoutesConstants, RoutesVersionEventsConstants, RoutesVersionsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = {
    ...AppTypesConstants.defaultState,
    isChanged: false,
};

export default function reducer(state = def, action) {
    switch (action.type) {
        case RoutesConstants.CHANGE_NAME_ROUTES_SUCCESS:
        case RoutesVersionsConstants.CLEAR_ROUTES_VERSIONS_SUCCESS:
        case RoutesVersionEventsConstants.POST_ROUTES_VERSION_EVENTS_SUCCESS:
        case RoutesVersionsConstants.PUT_ROUTES_VERSIONS_SUCCESS:
            return {...state, isChanged: true};

        case RoutesVersionsConstants.GET_ROUTES_VERSIONS:
            return {...state, results: {...def.results, isLoading: true}};

        case RoutesVersionsConstants.POST_ROUTES_VERSIONS:
            return {...state, results: {...def.results, isLoading: true}};

        case RoutesVersionsConstants.PUT_ROUTES_VERSIONS:
            return {...state, results: {...def.results, isLoading: true}};

        case RoutesVersionsConstants.DELETE_ROUTES_VERSIONS:
            return {...state, results: {...def.results, isLoading: true}};

        case RoutesVersionsConstants.GET_ROUTES_VERSIONS_SUCCESS:
        case RoutesVersionsConstants.GET_ROUTES_VERSIONS_FAILURE:
        case RoutesVersionsConstants.POST_ROUTES_VERSIONS_SUCCESS:
        case RoutesVersionsConstants.POST_ROUTES_VERSIONS_FAILURE:
        case RoutesVersionsConstants.PUT_ROUTES_VERSIONS_FAILURE:
        case RoutesVersionsConstants.DELETE_ROUTES_VERSIONS_SUCCESS:
        case RoutesVersionsConstants.DELETE_ROUTES_VERSIONS_FAILURE:
            return {...state, isChanged: false, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

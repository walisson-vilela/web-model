import { RoutesWindowMessageConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case RoutesWindowMessageConstants.FETCH_ROUTES_WINDOW_MESSAGE:
        case RoutesWindowMessageConstants.GET_ROUTES_WINDOW_MESSAGE_UNREAD:
        case RoutesWindowMessageConstants.POST_ROUTES_WINDOW_MESSAGE:
            return {...state, results: {...def.results, isLoading: true}};

        case RoutesWindowMessageConstants.FETCH_ROUTES_WINDOW_MESSAGE_SUCCESS:
        case RoutesWindowMessageConstants.FETCH_ROUTES_WINDOW_MESSAGE_FAILURE:
        case RoutesWindowMessageConstants.GET_ROUTES_WINDOW_MESSAGE_UNREAD_SUCCESS:
        case RoutesWindowMessageConstants.GET_ROUTES_WINDOW_MESSAGE_UNREAD_FAILURE:
        case RoutesWindowMessageConstants.POST_ROUTES_WINDOW_MESSAGE_SUCCESS:
        case RoutesWindowMessageConstants.POST_ROUTES_WINDOW_MESSAGE_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

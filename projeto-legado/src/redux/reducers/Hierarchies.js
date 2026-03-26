import { HierarchiesConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case HierarchiesConstants.FETCH_HIERARCHIES:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesConstants.GET_HIERARCHIES:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesConstants.POST_HIERARCHIES:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesConstants.PUT_HIERARCHIES:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesConstants.DELETE_HIERARCHIES:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesConstants.FETCH_HIERARCHIES_SUCCESS:
        case HierarchiesConstants.FETCH_HIERARCHIES_FAILURE:
        case HierarchiesConstants.POST_HIERARCHIES_SUCCESS:
        case HierarchiesConstants.POST_HIERARCHIES_FAILURE:
        case HierarchiesConstants.PUT_HIERARCHIES_SUCCESS:
        case HierarchiesConstants.PUT_HIERARCHIES_FAILURE:
        case HierarchiesConstants.DELETE_HIERARCHIES_SUCCESS:
        case HierarchiesConstants.DELETE_HIERARCHIES_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        case HierarchiesConstants.GET_HIERARCHIES_SUCCESS:
        case HierarchiesConstants.GET_HIERARCHIES_FAILURE:
            return {
                ...state,
                content: {
                    ...def.content,
                    result: action.payload
                }
            };

        default:
            return state;
    }
}

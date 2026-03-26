import { HierarchiesStructuresConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case HierarchiesStructuresConstants.FETCH_HIERARCHIES_STRUCTURES:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesStructuresConstants.GET_HIERARCHIES_STRUCTURE:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesStructuresConstants.POST_HIERARCHIES_STRUCTURE:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesStructuresConstants.PUT_HIERARCHIES_STRUCTURE:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesStructuresConstants.DELETE_HIERARCHIES_STRUCTURE:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesStructuresConstants.FETCH_HIERARCHIES_STRUCTURES_SUCCESS:
        case HierarchiesStructuresConstants.FETCH_HIERARCHIES_STRUCTURES_FAILURE:
        case HierarchiesStructuresConstants.GET_HIERARCHIES_STRUCTURE_SUCCESS:
        case HierarchiesStructuresConstants.GET_HIERARCHIES_STRUCTURE_FAILURE:
        case HierarchiesStructuresConstants.POST_HIERARCHIES_STRUCTURE_SUCCESS:
        case HierarchiesStructuresConstants.POST_HIERARCHIES_STRUCTURE_FAILURE:
        case HierarchiesStructuresConstants.PUT_HIERARCHIES_STRUCTURE_SUCCESS:
        case HierarchiesStructuresConstants.PUT_HIERARCHIES_STRUCTURE_FAILURE:
        case HierarchiesStructuresConstants.DELETE_HIERARCHIES_STRUCTURE_SUCCESS:
        case HierarchiesStructuresConstants.DELETE_HIERARCHIES_STRUCTURE_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}



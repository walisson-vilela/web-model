import { HierarchiesElementsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case HierarchiesElementsConstants.FETCH_HIERARCHIES_ELEMENTS:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesElementsConstants.GET_HIERARCHIES_ELEMENT:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesElementsConstants.POST_HIERARCHIES_ELEMENT:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesElementsConstants.PUT_HIERARCHIES_ELEMENT:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesElementsConstants.DELETE_HIERARCHIES_ELEMENT:
            return {...state, results: {...def.results, isLoading: true}};

        case HierarchiesElementsConstants.FETCH_HIERARCHIES_ELEMENTS_SUCCESS:
        case HierarchiesElementsConstants.FETCH_HIERARCHIES_ELEMENTS_FAILURE:
        case HierarchiesElementsConstants.GET_HIERARCHIES_ELEMENT_SUCCESS:
        case HierarchiesElementsConstants.GET_HIERARCHIES_ELEMENT_FAILURE:
        case HierarchiesElementsConstants.POST_HIERARCHIES_ELEMENT_SUCCESS:
        case HierarchiesElementsConstants.POST_HIERARCHIES_ELEMENT_FAILURE:
        case HierarchiesElementsConstants.PUT_HIERARCHIES_ELEMENT_SUCCESS:
        case HierarchiesElementsConstants.PUT_HIERARCHIES_ELEMENT_FAILURE:
        case HierarchiesElementsConstants.DELETE_HIERARCHIES_ELEMENT_SUCCESS:
        case HierarchiesElementsConstants.DELETE_HIERARCHIES_ELEMENT_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}


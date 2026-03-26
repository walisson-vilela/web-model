import { ZonesConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = {
    ...AppTypesConstants.defaultState,
    autocomplete: {...AppTypesConstants.defaultState.save}
};

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case ZonesConstants.FETCH_ZONES:
            return {...state, results: {...def.results, isLoading: true}};

        case ZonesConstants.FETCH_ZONES_SUCCESS:
        case ZonesConstants.FETCH_ZONES_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        case ZonesConstants.FIND_ZONES:
            return {...state, autocomplete: {...def.autocomplete, isLoading: true}};

        case ZonesConstants.FIND_ZONES_SUCCESS:
            return {...state, autocomplete: {...def.autocomplete, result: action.payload}};

        case ZonesConstants.FIND_ZONES_FAILURE:
            return {...state, autocomplete: {...def.autocomplete, error: action.payload}};

        default:
            return state;
    }
}

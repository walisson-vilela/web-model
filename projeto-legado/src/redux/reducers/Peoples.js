import AppTypesConstants from '../../constants/AppTypesConstants';
import PeoplesConstants from "../../constants/PeoplesConstants";

const defaultState = {
    ...AppTypesConstants.defaultState,
    autocomplete: {...AppTypesConstants.defaultState.save}
};

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case PeoplesConstants.FETCH_PEOPLES:
            return {...defaultState, isLoading: true, results: {...defaultState.results, isLoading: true}};

        case PeoplesConstants.FETCH_PEOPLES_SUCCESS:
            return {...defaultState, result: action.payload, results: action.payload};

        case PeoplesConstants.FETCH_PEOPLES_FAILURE:
            return {...defaultState, error: action.payload};

        case PeoplesConstants.FIND_PEOPLES:
            return {...state, autocomplete: {...defaultState.autocomplete, isLoading: true}};

        case PeoplesConstants.FIND_PEOPLES_SUCCESS:
            return {...state, autocomplete: {...defaultState.autocomplete, result: action.payload}};

        case PeoplesConstants.FIND_PEOPLES_FAILURE:
            return {...state, autocomplete: {...defaultState.autocomplete, error: action.payload}};

        default:
            return state;
    }
}

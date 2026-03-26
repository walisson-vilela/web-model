import AppTypesConstants from '../../constants/AppTypesConstants';
import MenusConstants from "../../constants/MenusConstants";

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case MenusConstants.LIST:
            return {...defaultState, isLoading: true};

        case MenusConstants.LIST_SUCCESS:
            return {...defaultState, result: action.payload};

        case MenusConstants.LIST_FAILURE:
            return {...defaultState, error: action.payload};
        default:
            return state;
    }
}

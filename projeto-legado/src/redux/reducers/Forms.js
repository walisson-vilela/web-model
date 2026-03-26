import { FormsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {

    const payload = action.payload || {};

    switch (action.type) {
        case FormsConstants.FETCH_FORMS:
            return {...state, results: {...def.results, isLoading: true}};

        case FormsConstants.FETCH_FORMS_SUCCESS:
        case FormsConstants.FETCH_FORMS_FAILURE:
            return {...state, results: {...def.results, ...payload}};

        default:
            return state;
    }
}

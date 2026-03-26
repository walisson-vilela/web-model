import { LocalizationsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case LocalizationsConstants.FETCH_LOCALIZATIONS:
            return {...state, results: {...def.results, isLoading: true}};

        case LocalizationsConstants.FETCH_LOCALIZATIONS_SUCCESS:
        case LocalizationsConstants.FETCH_LOCALIZATIONS_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

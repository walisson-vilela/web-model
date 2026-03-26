import { ProfilesConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case ProfilesConstants.FETCH_PROFILES:
            return {...state, results: {...def.results, isLoading: true}};

        case ProfilesConstants.FETCH_PROFILES_SUCCESS:
        case ProfilesConstants.FETCH_PROFILES_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

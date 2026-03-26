import { BirthdaysConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case BirthdaysConstants.FETCH_BIRTHAYS:
            return {...state, results: {...def.results, isLoading: true}};

        case BirthdaysConstants.FETCH_BIRTHAYS_SUCCESS:
        case BirthdaysConstants.FETCH_BIRTHAYS_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

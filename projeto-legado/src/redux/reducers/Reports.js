import { ReportsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {

    const payload = action.payload || {};

    switch (action.type) {
        case ReportsConstants.FETCH_REPORTS:
            return {...state, results: {...def.results, isLoading: true}};

        case ReportsConstants.FETCH_REPORTS_SUCCESS:
        case ReportsConstants.FETCH_REPORTS_FAILURE:
            return {...state, results: {...def.results, ...payload}};

        default:
            return state;
    }
}

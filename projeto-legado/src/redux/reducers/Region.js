import { RegionConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case RegionConstants.FETCH_REGION:
        case RegionConstants.GET_REGION:
            return {...state, results: {...def.results, isLoading: true}};

        case RegionConstants.FETCH_REGION_SUCCESS:
        case RegionConstants.FETCH_REGION_FAILURE:
        case RegionConstants.GET_REGION_SUCCESS:
        case RegionConstants.GET_REGION_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

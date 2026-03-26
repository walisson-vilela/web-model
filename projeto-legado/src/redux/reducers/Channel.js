import { ChannelConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case ChannelConstants.FETCH_CHANNEL:
            return {...state, results: {...def.results, isLoading: true}};

        case ChannelConstants.FETCH_CHANNEL_SUCCESS:
        case ChannelConstants.FETCH_CHANNEL_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

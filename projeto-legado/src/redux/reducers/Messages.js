import { MessagesConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {
    switch (action.type)
    {
        case MessagesConstants.FETCH_UNREAD_MESSAGES:
            return {...state, results: {...def.results, isLoading: true}};

        case MessagesConstants.FETCH_UNREAD_MESSAGES_SUCCESS:
        case MessagesConstants.FETCH_UNREAD_MESSAGES_FAILURE:
            return {...state, results: {...def.results, ...action.payload}};

        default:
            return state;
    }
}

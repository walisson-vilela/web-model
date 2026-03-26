import AppTypesConstants from '../../constants/AppTypesConstants';
import StoresConstants from "../../constants/StoresConstants";

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case StoresConstants.FETCH_STORES:
            return {...defaultState, isLoading: true};

        case StoresConstants.FETCH_STORES_SUCCESS:
            return {...defaultState, result: action.payload};

        case StoresConstants.FETCH_STORES_FAILURE:
            return {...defaultState, error: action.payload};

        case StoresConstants.GET_STORE:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    isLoading: true
                }
            };

        case StoresConstants.GET_STORE_SUCCESS:
            let row = action.payload.data;
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    result: {
                        id: row.id,
                        name: row.name,
                        status: row.status,
                        type: row.type
                    }
                }
            };

        case StoresConstants.GET_STORE_FAILURE:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    error: true
                }
            };

        default:
            return state;
    }
}

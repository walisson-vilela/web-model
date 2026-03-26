import AppTypesConstants from '../../constants/AppTypesConstants';
import ClientsConstants from "../../constants/ClientsConstants";

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case ClientsConstants.GET_CLIENT:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    isLoading: true
                }
            };

        case ClientsConstants.PUT_CLIENT:
            return {
                ...state,
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        isLoading: true
                    }
                }
            };

        case ClientsConstants.GET_CLIENT_SUCCESS:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    result: action.payload
                }
            };

        case ClientsConstants.PUT_CLIENT_SUCCESS:
            // state.content.result = action.payload;
            return {
                ...state,
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        success: true,
                        result: action.payload
                    }
                }
            };


        case ClientsConstants.GET_CLIENT_FAILURE:
        case ClientsConstants.PUT_CLIENT_FAILURE:
            return {
                ...state,
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        error: true,
                        result: action.payload
                    }
                }
            };

        default:
            return state;
    }
}

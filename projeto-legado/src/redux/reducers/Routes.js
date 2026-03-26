import AppTypesConstants from '../../constants/AppTypesConstants';
import RoutesConstants from "../../constants/RoutesConstants";

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case RoutesConstants.FETCH_ROUTES:
            return {...defaultState, isLoading: true};

        case RoutesConstants.FETCH_ROUTES_SUCCESS:
            return {...defaultState, result: action.payload};

        case RoutesConstants.FETCH_ROUTES_FAILURE:
            return {...defaultState, error: action.payload};

        case RoutesConstants.GET_ROUTES:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    isLoading: true
                }
            };

        case RoutesConstants.PUT_ROUTES:
        case RoutesConstants.POST_ROUTES:
        case RoutesConstants.DELETE_ROUTES:
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

        case RoutesConstants.GET_ROUTES_SUCCESS:
            //let row = action.payload.data;
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    result: action.payload
                }
            };

        case RoutesConstants.PUT_ROUTES_SUCCESS:
        // case RoutesConstants.POST_ROUTES_SUCCESS:
            if(action.type === RoutesConstants.POST_ROUTES_SUCCESS){
                state.result.data.push(action.payload.data);
            }else{
                state.content.result = action.payload;
            }
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

        default:
            return state;
    }
}

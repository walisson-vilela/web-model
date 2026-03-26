import AppTypesConstants from '../../constants/AppTypesConstants';
import ProductsConstants from "../../constants/ProductsConstants";

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case ProductsConstants.FETCH_PRODUCTS:
            return {...defaultState, isLoading: true};

        case ProductsConstants.FETCH_PRODUCTS_SUCCESS:
            return {...defaultState, result: action.payload};

        case ProductsConstants.FETCH_PRODUCTS_FAILURE:
            return {...defaultState, error: action.payload};

        case ProductsConstants.GET_PRODUCT:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    isLoading: true
                }
            };

        case ProductsConstants.GET_PRODUCT_SUCCESS:
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

        case ProductsConstants.GET_PRODUCT_FAILURE:
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

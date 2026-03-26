import { EPIWarehouseConstants } from '../../constants'

const initialState = {
  results: [],
  isLoading: false,
  pagination: null,
  content: null,

  decreases: [],
  decreasesPagination: null,
  decreasesLoading: false,
}

export default function reducer(state = initialState, action) {
  const payload = action.payload || {}
  const props = action.props || {}

  switch (action.type) {
    case EPIWarehouseConstants.FETCH_EPIWAREHOUSE:
      return {
        ...state,
        isLoading: true,
      }

    case EPIWarehouseConstants.FETCH_EPIWAREHOUSE_SUCCESS:
      return {
        ...state,
        results: payload.results || [],
        pagination: payload.pagination || null,
        isLoading: false,
      }

    case EPIWarehouseConstants.FETCH_EPIWAREHOUSE_FAILURE:
      return {
        ...state,
        results: [],
        pagination: null,
        isLoading: false,
      }

    case EPIWarehouseConstants.GET_EPIWAREHOUSE:
      return {
        ...state,
        isLoading: true,
      }

    case EPIWarehouseConstants.GET_EPIWAREHOUSE_SUCCESS:
      return {
        ...state,
        content: payload,
        isLoading: false,
      }

    case EPIWarehouseConstants.GET_EPIWAREHOUSE_FAILURE:
      return {
        ...state,
        content: null,
        isLoading: false,
      }

    case EPIWarehouseConstants.GET_DECREASE:
      return {
        ...state,
        decreasesLoading: true,
      }

    case EPIWarehouseConstants.GET_DECREASE_SUCCESS:
      return {
        ...state,
        decreases: payload.data || [],
        decreasesPagination: payload.pagination || null,
        decreasesLoading: false,
      }

    case EPIWarehouseConstants.GET_DECREASE_FAILURE:
      return {
        ...state,
        decreases: [],
        decreasesPagination: null,
        decreasesLoading: false,
      }

    case EPIWarehouseConstants.EPI_INVENTORY_MANUAL_DECREASE_ADD:
      return {
        ...state,
        decreasesLoading: true,
      }

    case EPIWarehouseConstants.EPI_INVENTORY_MANUAL_DECREASE_ADD_SUCCESS:
      return {
        ...state,
        decreases: payload.data || [],
        decreasesPagination: payload.pagination || null,
        decreasesLoading: false,
      }

    case EPIWarehouseConstants.EPI_INVENTORY_MANUAL_DECREASE_ADD_FAILURE:
      return {
        ...state,
        decreases: [],
        decreasesPagination: null,
        decreasesLoading: false,
      }

    default:
      return state
  }
}

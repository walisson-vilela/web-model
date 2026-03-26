import AppTypes from '../../../../../constants/AppTypesConstants'
import { NETWORK_TYPES } from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NETWORK_TYPES.FETCH_NETWORK_REQUEST: {
      const newState = { ...state }

      newState.results.isLoading = true

      return newState
    }

    case NETWORK_TYPES.FETCH_NETWORK_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false

      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = false
        newState.results = action.payload

        return newState
      }
      newState.results.isLoading = false
      newState.alerts.message = false
      newState.results = action.payload

      return newState
    }

    case NETWORK_TYPES.FETCH_NETWORK_FAILURE: {
      return state
    }

    case NETWORK_TYPES.FETCH_NETWORK_BY_QUERY_PARAM_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case NETWORK_TYPES.FETCH_NETWORK_BY_QUERY_PARAM_SUCCESS: {
      const newState = { ...state }
      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = true
        newState.results = action.payload
        return newState
      } else {
        newState.results = action.payload
        newState.results.isLoading = false
        newState.results2 = action.payload
        return newState
      }
    }

    case NETWORK_TYPES.FETCH_NETWORK_BY_QUERY_PARAM_FAILURE: {
      return state
    }

    case NETWORK_TYPES.ADD_NETWORK_FILTER: {
      const newState = { ...state }
      newState.networkSearchFilter.count = state.networkSearchFilter.count + 1
      newState.networkSearchFilter.data = state.networkSearchFilter.data.concat(
        action.payload,
      )
      newState.results.isLoading = false
      return newState
    }

    case NETWORK_TYPES.REMOVE_NETWORK_ITEM: {
      const newState = { ...state }
      if (
        newState.networkSearchFilter.count === 0 ||
        newState.networkSearchFilter.data.length <= 0
      ) {
        console.log('Todos os filtros foram removidos')
        newState.results.isLoading = true
        newState.results.data = state.searchFilter.prevState
        newState.results2.data = []
        newState.results.isLoading = false
        newState.networkSearchFilter.isClosed = true
        return newState
      }

      newState.networkSearchFilter.data = [
        ...state.networkSearchFilter.data.slice(0, action.index),
        ...state.networkSearchFilter.data.slice(action.index + 1),
      ]
      newState.networkSearchFilter.count = state.networkSearchFilter.count - 1
      // newState.results.data = state.searchFilter.prevState;
      return newState
    }

    case NETWORK_TYPES.REMOVE_ALL_NETWORK_FILTERS: {
      const newState = { ...state }
      newState.networkSearchFilter.count = 0
      newState.networkSearchFilter.data = []
      return newState
    }

    default:
      return state
  }
}

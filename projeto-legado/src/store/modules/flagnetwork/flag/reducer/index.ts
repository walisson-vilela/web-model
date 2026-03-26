import AppTypes from '../../../../../constants/AppTypesConstants'
import { FLAG_NETWORK } from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FLAG_NETWORK.FETCH_GROUPS_REQUEST: {
      const newState = { ...state }

      newState.results.isLoading = true

      return newState
    }

    case FLAG_NETWORK.FETCH_GROUPS_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false

      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = false
        newState.results = action.payload

        return newState
      }

      newState.results.isLoading = false
      newState.searchFilter.prevState = state.results.data
      newState.alerts.message = false
      newState.results = action.payload

      return newState
    }

    case FLAG_NETWORK.FETCH_GROUPS_FAILURE: {
      return state
    }

    case FLAG_NETWORK.FETCH_FLAG_BY_QUERY_PARAM_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case FLAG_NETWORK.FETCH_FLAG_BY_QUERY_PARAM_SUCCESS: {
      const newState = { ...state }
      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = true
        state.alerts.message = true
        newState.results = action.payload
        return newState
      } else {
        newState.results = action.payload
        newState.results.isLoading = false

        return newState
      }
    }

    case FLAG_NETWORK.FETCH_FLAG_BY_QUERY_PARAM_FAILURE: {
      return state
    }

    case FLAG_NETWORK.ADD_FLAG_FILTER: {
      const newState = { ...state }
      newState.flagSearchFilter.count = state.searchFilter.count + 1
      newState.flagSearchFilter.data = state.searchFilter.data.concat(
        action.payload,
      )
      newState.results.isLoading = false
      return newState
    }

    case FLAG_NETWORK.REMOVE_FLAG_ITEM: {
      const newState = { ...state }
      if (
        newState.flagSearchFilter.count === 0 ||
        newState.flagSearchFilter.data.length <= 0
      ) {
        console.log('Todos os filtros foram removidos')
        newState.results.isLoading = true
        newState.results.data = state.searchFilter.prevState
        newState.results2.data = []
        newState.results.isLoading = false
        return newState
      }

      newState.flagSearchFilter.data = [
        ...state.flagSearchFilter.data.slice(0, action.index),
        ...state.flagSearchFilter.data.slice(action.index + 1),
      ]
      newState.flagSearchFilter.count = state.flagSearchFilter.count - 1
      // newState.results.data = state.searchFilter.prevState;
      return newState
    }

    case FLAG_NETWORK.REMOVE_ALL_FLAG_FILTERS: {
      const newState = { ...state }
      newState.flagSearchFilter.count = 0
      newState.flagSearchFilter.data = []
      return newState
    }

    default:
      return state
  }
}

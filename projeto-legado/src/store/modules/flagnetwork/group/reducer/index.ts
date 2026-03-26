import AppTypes from '../../../../../constants/AppTypesConstants'
import { GROUP_TYPES } from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GROUP_TYPES.FETCH_GROUP_REQUEST: {
      const newState = { ...state }

      newState.results.isLoading = true

      return newState
    }

    case GROUP_TYPES.FETCH_GROUP_SUCCESS: {
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

    case GROUP_TYPES.FETCH_GROUP_SUCCESS: {
      return state
    }

    case GROUP_TYPES.FETCH_GROUP_BY_QUERY_PARAM_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case GROUP_TYPES.FETCH_GROUP_BY_QUERY_PARAM_SUCCESS: {
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
        newState.results2 = action.payload
        return newState
      }
    }

    case GROUP_TYPES.FETCH_GROUP_BY_QUERY_PARAM_FAILURE: {
      return state
    }

    case GROUP_TYPES.ADD_GROUP_FILTER: {
      const newState = { ...state }
      newState.groupSearchFilter.count = state.groupSearchFilter.count + 1
      newState.groupSearchFilter.data = state.groupSearchFilter.data.concat(
        action.payload,
      )
      newState.results.isLoading = false
      return newState
    }

    case GROUP_TYPES.REMOVE_GROUP_ITEM: {
      const newState = { ...state }
      if (
        newState.groupSearchFilter.count === 0 ||
        newState.groupSearchFilter.data.length <= 0
      ) {
        console.log('Todos os filtros foram removidos')
        newState.results.isLoading = true
        newState.results.data = state.searchFilter.prevState
        newState.results2.data = []
        newState.results.isLoading = false
        newState.groupSearchFilter.isClosed = true
        return newState
      }

      newState.groupSearchFilter.data = [
        ...state.groupSearchFilter.data.slice(0, action.index),
        ...state.groupSearchFilter.data.slice(action.index + 1),
      ]
      newState.groupSearchFilter.count = state.groupSearchFilter.count - 1
      // newState.results.data = state.searchFilter.prevState;
      return newState
    }

    case GROUP_TYPES.REMOVE_ALL_GROUP_FILTERS: {
      const newState = { ...state }
      newState.groupSearchFilter.count = 0
      newState.groupSearchFilter.data = []
      return newState
    }

    default:
      return state
  }
}

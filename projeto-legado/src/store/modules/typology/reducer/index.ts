import AppTypes from '../../../../constants/AppTypesConstants'
import { RegionConstants } from '../../regions/types'
import { TypologyTypes } from '../types/index'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TypologyTypes.FETCH_TYPOLOGY_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case TypologyTypes.FETCH_TYPOLOGY_SUCESS: {
      const newState = { ...state }
      newState.searchFilter.prevState = state.results.data
      ;(newState.results = action.payload), (newState.results.isLoading = false)
      newState.searchFilter.initialState = action.payload

      return newState
    }

    case TypologyTypes.FETCH_TYPOLOGY_FAILURE: {
      return state
    }

    // GET ACTIVE_REGIONS

    case TypologyTypes.FETCH_ACTIVE_TYPOLOGY_REQUEST: {
      const newState = { ...state }
      newState.searchFilter.isClosed = false
      newState.results.isLoading = true
      return newState
    }

    case TypologyTypes.FETCH_ACTIVE_TYPOLOGY_SUCESS: {
      const newState = { ...state }
      newState.searchFilter.prevState = state.results.data
      newState.results = action.payload
      newState.results.isLoading = false
      return newState
    }
    case TypologyTypes.FETCH_ACTIVE_TYPOLOGY_FAILURE: {
      return state
    }

    case TypologyTypes.FETCH_TYPOLOGY_BY_PARAM_REQUEST: {
      const newState = { ...state }
      console.log('OrderStatus Failure', newState.results)
      newState.results.isLoading = true
      return newState
    }

    case TypologyTypes.FETCH_TYPOLOGY_BY_PARAM_SUCCESS: {
      const newState = { ...state }

      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = true
        state.alerts.message = true
        newState.results2.data.length = 0
        return newState
      } else {
        newState.results = action.payload
        newState.results.isLoading = false
        newState.results2 = action.payload
        return newState
      }
    }

    case TypologyTypes.FETCH_TYPOLOGY_BY_PARAM_FAILURE: {
      return state
    }

    case TypologyTypes.FETCH_TYPOLOGY_BY_QUERY_PARAM_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case TypologyTypes.FETCH_TYPOLOGY_BY_QUERY_PARAM_SUCCESS: {
      const newState = { ...state }
      newState.results = action.payload
      newState.results.isLoading = false
      return newState
    }

    case TypologyTypes.FETCH_TYPOLOGY_BY_QUERY_PARAM_FAILURE: {
      return state
    }

    case TypologyTypes.ADD_TYPOLOGY_FITER: {
      const newState = { ...state }
      newState.searchFilter.count = state.searchFilter.count + 1
      newState.searchFilter.data = state.searchFilter.data.concat(
        action.payload,
      )
      newState.results.isLoading = false
      return newState
    }
    case TypologyTypes.REMOVE_ITEM: {
      const newState = { ...state }
      if (
        newState.searchFilter.count === 0 ||
        newState.searchFilter.data.length <= 0
      ) {
        console.log('Todos os filtros foram removidos')
        newState.results.isLoading = true
        newState.results.data = state.searchFilter.prevState
        newState.results2.data = []
        newState.results.isLoading = false
        newState.searchFilter.isClosed = true
        return newState
      }

      newState.searchFilter.data = [
        ...state.searchFilter.data.slice(0, action.index),
        ...state.searchFilter.data.slice(action.index + 1),
      ]
      newState.searchFilter.count = state.searchFilter.count - 1
      // newState.results.data = state.searchFilter.prevState;
      return newState
    }

    case TypologyTypes.REMOVE_ALL_FILTERS: {
      const newState = { ...state }
      newState.searchFilter.count = 0
      newState.searchFilter.data = []
      return newState
    }

    case TypologyTypes.OPEN_APPLY_FILTER_MENU: {
      const newState = { ...state }
      newState.searchFilter.isClosed = false
      return newState
    }

    case RegionConstants.FETCH_REGIONS_BY_QUERY_PARAM_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true

      return newState
    }

    case RegionConstants.FETCH_REGIONS_BY_QUERY_PARAM_SUCCESS: {
      const newState = { ...state }

      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = true
        newState.results.data.length = 0
        newState.results2.data.length = 0
        return newState
      } else {
        newState.results = action.payload
        newState.results.isLoading = false
        newState.results2 = action.payload
        return newState
      }
    }

    case RegionConstants.FETCH_REGIONS_BY_QUERY_PARAM_FAILURE: {
      const newState = { ...state }
      newState.alerts.message = true
      newState.results.data.length = 0
      newState.results2.data.length = 0
      newState.results.isLoading = false
      return newState
    }

    default: {
      return state
    }
  }
}

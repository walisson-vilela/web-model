import AppTypes from '../../../../constants/AppTypesConstants'
import { RegionConstants } from '../../regions/types'
import { DISTRIBUTION_TYPES } from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DISTRIBUTION_TYPES.FETCH_ALL_DISTRIBUTION_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true

      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_ALL_DISTRIBUTION_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      newState.results2.isLoading = false
      newState.results = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_ALL_DISTRIBUTION_FAILURE: {
      return state
    }

    // FETCH  DISTRIBUTION CENTER BY INPUT SEARCH
    case RegionConstants.FETCH_REGIONS_BY_PARAM_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_REGIONS_BY_PARAM_SUCCESS: {
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
      }
    }

    case RegionConstants.FETCH_REGIONS_BY_PARAM_FAILURE: {
      const newState = { ...state }
      // newState.results.isLoading = false;
      return newState
    }

    // FETCH DISTRIBUTION_ BY FILTERS

    case DISTRIBUTION_TYPES.FETCH_ACTIVE_DISTRIBUTION_CENTER_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_ACTIVE_DISTRIBUTION_CENTER_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      newState.searchFilter.prevState = state.results.data
      newState.results = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_ACTIVE_DISTRIBUTION_CENTER_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.FETCH_PARTICULARITY_DISTRIBUTION_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_PARTICULARITY_DISTRIBUTION_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      if (action.payload.data.length <= 0) {
        newState.alerts.message = false
        newState.results = action.payload
        return newState
      }
      newState.alerts.message = false
      newState.searchFilter.prevState = state.results.data
      newState.results = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_PARTICULARITY_DISTRIBUTION_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.FETCH_APPORTIONMENT_DISTRIBUTION_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_APPORTIONMENT_DISTRIBUTION_SUCCESS: {
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

    case DISTRIBUTION_TYPES.FETCH_APPORTIONMENT_DISTRIBUTION_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_CITY_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_CITY_SUCCESS: {
      const newState = { ...state }
      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = false
        newState.results = action.payload
        return newState
      }
      newState.searchFilter.prevState = state.results.data
      newState.alerts.message = false
      newState.results.isLoading = false
      newState.results = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_STATE_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_STATE_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_STATE_SUCCESS: {
      const newState = { ...state }
      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = false
        newState.results = action.payload
        return newState
      }
      newState.searchFilter.prevState = state.results.data
      newState.results.isLoading = false
      newState.alerts.message = false
      newState.results = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_STATE_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_FLAG_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_FLAG_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      if (action.payload.data <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = false
        newState.results = action.payload
        return newState
      }
      newState.searchFilter.prevState = state.results.data
      newState.results = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_FLAG_FAILURE: {
      return state
    }

    // ADD FILTER

    case DISTRIBUTION_TYPES.DISTRIBUTION_CENTER_ADD_FILTER_REQUEST: {
      const newState = { ...state }
      newState.searchFilter.count = state.searchFilter.count + 1
      newState.searchFilter.data = state.searchFilter.data.concat(
        action.payload,
      )
      newState.results.isLoading = false
      return newState
    }

    case DISTRIBUTION_TYPES.DISTRIBUTION_CENTER_REMOVE_FILTER: {
      const newState = { ...state }
      newState.searchFilter.data = [
        ...state.searchFilter.data.slice(0, action.index),
        ...state.searchFilter.data.slice(action.index + 1),
      ]
      newState.searchFilter.count = state.searchFilter.count - 1
      return newState
    }

    case DISTRIBUTION_TYPES.DISTRIBUTION_CENTER_REMOVE_ALL_FILTER: {
      const newState = { ...state }
      newState.searchFilter.data = []
      newState.searchFilter.count = 0
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_APPORTIONMENT_REQUEST: {
      const newState = { ...state }
      newState.modalResults.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_APPORTIONMENT_SUCESSS: {
      const newState = { ...state }
      newState.modalResults.isLoading = false
      newState.modalResults = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_APPORTIONMENT_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_BY_PARAM_REQUEST: {
      const newState = { ...state }
      newState.modalResults.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_BY_PARAM_SUCCESS: {
      const newState = { ...state }
      newState.modalResults.isLoading = false
      newState.modalResults = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_BY_PARAM_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_PARTICULARY_REQUEST: {
      const newState = { ...state }
      newState.modalResults.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_PARTICULARY_SUCCESS: {
      const newState = { ...state }
      newState.modalResults = action.payload
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_PARTICULARY_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.DISTRIBUTION_MODAL_ADD_FILTER: {
      const newState = { ...state }
      newState.modalSearchFilter.count = state.modalSearchFilter.count + 1
      newState.modalSearchFilter.data = state.modalSearchFilter.data.concat(
        action.payload,
      )
      return newState
    }

    case DISTRIBUTION_TYPES.DISTRIBUTION_MODAL_REMOVE_ALL_FILTERS: {
      const newState = { ...state }
      newState.modalSearchFilter.data = []
      newState.modalSearchFilter.count = 0
      return newState
    }

    case DISTRIBUTION_TYPES.FETCTH_HISTORY_BY_Q_PARAM_REQUEST: {
      const newState = { ...state }
      newState.modalResults.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_BY_Q_PARAM_SUCCESS: {
      const newState = { ...state }
      newState.modalResults.isLoading = true

      if (action.payload.data <= 0) {
        newState.modalResults.isLoading = false
        newState.alerts.message = true
        newState.modalResults.data.length = 0
        return newState
      } else {
        newState.modalResults.isLoading = false
        newState.modalResults = action.payload
        return newState
      }
    }

    case DISTRIBUTION_TYPES.REMOVE_DISTRIBUTION_MODAL_ITEM: {
      const newState = { ...state }
      newState.modalSearchFilter.data = [
        ...state.modalSearchFilter.data.slice(0, action.index),
        ...state.modalSearchFilter.data.slice(action.index + 1),
      ]
      newState.modalSearchFilter.count = state.modalSearchFilter.count - 1
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_HISTORY_BY_Q_PARAM_FAILURE: {
      return state
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_SEARCH_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_SEARCH_SUCCESS: {
      const newState = { ...state }
      if (action.payload.data.length <= 0) {
        newState.results.isLoading = false
        newState.alerts.message = true
        newState.results.data.length = 0
        newState.results2.data.length = 0
        return newState
      } else {
        newState.results.isLoading = false
        newState.results = action.payload
        return newState
      }
    }

    case DISTRIBUTION_TYPES.FETCH_DISTRIBUTION_BY_SEARCH_FAILURE: {
      return state
    }

    default: {
      return state
    }
  }
}

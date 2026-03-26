import AppTypes from '../../../../constants/AppTypesConstants'
import { RegionConstants } from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // GET ALL REGIONS
    case RegionConstants.FETCH_REGIONS: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_REGIONS_SUCCESS: {
      const newState = { ...state }
      ;(newState.results = action.payload), (newState.results.isLoading = false)
      return newState
    }

    case RegionConstants.FETCH_REGIONS_FAILURE: {
      return state
    }

    // GET ACTIVE_REGIONS

    case RegionConstants.FETCH_ACTIVE_REGIONS_REQUEST: {
      const newState = { ...state }

      newState.results.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_ACTIVE_REGIONS_SUCESS: {
      const newState = { ...state }
      newState.searchFilter.prevState = state.results.data
      newState.results = action.payload
      newState.results.isLoading = false
      return newState
    }

    // GET INATIVE_REGIONS
    case RegionConstants.FETCH_REGIONS_BY_PARAM_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_REGIONS_BY_PARAM_SUCCESS: {
      const newState = { ...state }
      newState.results = action.payload
      newState.results.isLoading = false
      return newState
    }

    case RegionConstants.FETCH_REGIONS_BY_PARAM_FAILURE: {
      return state
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

    case RegionConstants.FETCH_EMPTY_DATA: {
      const newState = { ...state }
      newState.success = false
      newState.results.data.length = 0
      return newState
    }

    case RegionConstants.FETCH_USERS_REQUEST: {
      const newState = { ...state }
    }

    case RegionConstants.FETCH_USERS_SUCCESS: {
      const newState = { ...state }
      newState.results.users = action.payload
      return newState
    }

    case RegionConstants.FETCH_USERS_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_PDVS_REQUEST: {
      const newState = { ...state }
      return newState
    }

    case RegionConstants.FETCH_PDVS_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      newState.results.pdv = action.payload.data
      return newState
    }

    case RegionConstants.FETCH_PDVS_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_STATES_REQUEST: {
      return state
    }

    case RegionConstants.FETCH_STATES_SUCCESS: {
      const newState = { ...state }
      newState.results.state = action.payload
      return newState
    }

    case RegionConstants.FETCH_STATES_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_CITIES_REQUEST: {
      const newState = { ...state }
      newState.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_CITIES_SUCCESS: {
      const newState = { ...state }
      newState.isLoading = false
      newState.results.city = action.payload
      return newState
    }

    case RegionConstants.FETCH_CITIES_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_USERS_BY_FILTER_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_USERS_BY_FILTER_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      if (action.payload.data.length <= 0) {
        newState.results = action.payload
        return newState
      } else {
        newState.results = action.payload
        newState.searchFilter.prevState = state.results.data
        return newState
      }
    }

    case RegionConstants.FETCH_USERS_BY_FILTER_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_PDV_BY_FILTER_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_PDV_BY_FILTER_SUCCESS: {
      const newState = { ...state }
      if (action.payload.data.length <= 0) {
        newState.results = action.payload
        newState.results.isLoading = false
        return newState
      } else {
        newState.results = action.payload
        newState.searchFilter.prevState = state.results.data
        return newState
      }
    }

    case RegionConstants.FETCH_PDV_BY_FILTER_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_STATE_BY_FILTER_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true

      return newState
    }

    case RegionConstants.FETCH_STATE_BY_FILTER_SUCCESS: {
      const newState = { ...state }

      if (action.payload.data.length <= 0) {
        newState.results = action.payload
        return newState
      } else {
        newState.results = action.payload
        newState.searchFilter.prevState = state.results.data
        return newState
      }
    }

    case RegionConstants.FETCH_STATE_BY_FILTLER_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_CITY_BY_FILTER_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_CITY_BY_FILTER_SUCCESS: {
      const newState = { ...state }
      if (action.payload.data.length <= 0) {
        newState.results = action.payload
        newState.results.isLoading = false
        return newState
      } else {
        newState.results = action.payload
        newState.results.isLoading = false
        newState.searchFilter.prevState = state.results.data
        return newState
      }
    }

    case RegionConstants.FETCH_CITY_BY_FILTER_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_NEIGHBORHOOD_BY_FILTER_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_NEIGHBORHOOD_BY_FILTER_SUCCESS: {
      const newState = { ...state }
      if (action.payload.data.length <= 0) {
        newState.results = action.payload
        newState.results.isLoading = false
        return newState
      } else {
        newState.results = action.payload
        newState.results.isLoading = false
        newState.searchFilter.prevState = state.results.data
        return newState
      }
    }

    case RegionConstants.FETCH_NEIGHBORHOOD_BY_FILTER_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_SUBLOCALITIES_REQUEST: {
      const newState = { ...state }
      newState.isLoading = true
      return newState
    }

    case RegionConstants.FETCH_SUBLOCALITIES_SUCCESS: {
      const newState = { ...state }
      newState.results.neighboord = action.payload
      newState.searchFilter.prevState = state.results.data
      return newState
    }
    case RegionConstants.FETCH_SUBLOCALITIES_FAILURE: {
      return state
    }

    case RegionConstants.FETCH_EMPTY_DATA: {
      const newState = { ...state }
      newState.error = true
      return newState
    }

    case RegionConstants.ADD_APPLY_FILTER_REQUEST: {
      const newState = { ...state }
      newState.searchFilter.count = state.searchFilter.count + 1
      newState.searchFilter.data = state.searchFilter.data.concat(
        action.payload,
      )
      newState.results.isLoading = false
      return newState
    }

    case RegionConstants.REGIONS_REMOVE_ITEM: {
      const newState = { ...state }
      newState.searchFilter.data = [
        ...state.searchFilter.data.slice(0, action.index),
        ...state.searchFilter.data.slice(action.index + 1),
      ]
      newState.searchFilter.count = state.searchFilter.count - 1
      // newState.results.data = state.searchFilter.prevState;
      return newState
    }

    case RegionConstants.REGIONS_OPEN_STATUS_BAR: {
      const newState = { ...state }
      newState.searchFilter.isOpen = true
      return newState
    }

    case RegionConstants.REGIONS_CLOSE_STATUS_BAR: {
      const newState = { ...state }
      newState.searchFilter.isOpen = false
      return newState
    }

    case RegionConstants.REGIONS_REMOVE_ALL_FILTERS: {
      const newState = { ...state }

      newState.searchFilter.count = 0
      newState.searchFilter.data = []
      return newState
    }

    default: {
      return state
    }
  }
}

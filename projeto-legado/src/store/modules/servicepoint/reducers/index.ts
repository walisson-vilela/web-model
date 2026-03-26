import AppTypes from '../../../../constants/AppTypesConstants'
import * as types from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SERVICE_POINT_TYPES.FETCH_SERVICE_POINT_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case types.SERVICE_POINT_TYPES.FETCH_SERVICE_POINT_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      newState.results = action.payload
      return newState
    }

    case types.SERVICE_POINT_TYPES.FETCH_SERVICE_POINT_FAILURE: {
      return state
    }

    default: {
      return state
    }
  }
}

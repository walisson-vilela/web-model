import AppTypes from '../../../../../constants/AppTypesConstants'
import * as types from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GROUP_TYPES.FETCH_GROUP_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case types.GROUP_TYPES.FETCH_GROUP_SUCCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      newState.results = action.payload
      return newState
    }

    case types.GROUP_TYPES.FETCH_GROUP_FAILURE: {
      return state
    }

    default: {
      return state
    }
  }
}

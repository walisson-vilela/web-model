import AppTypes from '../../../../../constants/AppTypesConstants'
import { MANAGER_TIME_TYPES } from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MANAGER_TIME_TYPES.FETCH_MANAGER_TIME_REQUEST: {
      const newState = { ...state }
      newState.results.isLoading = true
      return newState
    }

    case MANAGER_TIME_TYPES.FETCH_MANAGER_TIME_SUCESS: {
      const newState = { ...state }
      newState.results.isLoading = false
      newState.results = action.payload
      return newState
    }

    case MANAGER_TIME_TYPES.FETCH_MANAGER_TIME_FAILURE: {
      return state
    }

    default: {
      return state
    }
  }
}

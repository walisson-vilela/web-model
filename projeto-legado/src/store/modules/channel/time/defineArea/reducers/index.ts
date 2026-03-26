import AppTypes from '../../../../../../constants/AppTypesConstants'
import { DEFINE_AREA_TYPES } from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DEFINE_AREA_TYPES.FETCH_ALL_AREAS_REQUEST: {
      const newState = { ...state }
      newState.storeData.isLoading = true
      return newState
    }

    case DEFINE_AREA_TYPES.FETCH_ALL_AREAS_SUCCESS: {
      const newState = { ...state }
      newState.storeData.data = action.payload
      newState.storeData.isLoading = false
      return newState
    }

    case DEFINE_AREA_TYPES.FETCH_ALL_AREAS_FAILURE: {
      return state
    }

    default: {
      return state
    }
  }
}

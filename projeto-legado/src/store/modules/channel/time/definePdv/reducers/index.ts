import AppTypes from '../../../../../../constants/AppTypesConstants'
import { DEFINE_PDV_TYPES } from '../types'

const initialState = AppTypes.defaultState

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DEFINE_PDV_TYPES.FETCH_ALL_PDVS_REQUEST: {
      const newState = { ...state }
      newState.storeData.isLoading = true
      return newState
    }

    case DEFINE_PDV_TYPES.FETCH_ALL_PDVS_SUCCESS: {
      const newState = { ...state }
      newState.storeData.data = action.payload
      newState.storeData.isLoading = false
      return newState
    }

    case DEFINE_PDV_TYPES.FETCH_ALL_PDVS_FAILURE: {
      return state
    }

    default: {
      return state
    }
  }
}

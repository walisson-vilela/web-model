import * as types from '../types/index'

const initialState = {
  isLoading: true,
  data: [],
  success: false,
  searchFilter: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_OCCUPATION_REQUEST: {
      return state
    }

    case types.GET_OCCUPATION_SUCESS: {
      const newState = { ...state }
      newState.isLoading = false
      newState.success = true
      newState.data = action.payload.data
      return newState
    }

    case types.POST_OCCUPATION_FILTER: {
      return {
        ...state,
        data: action.payload.data,
      }
    }

    case types.GET_OCCUPATION_FAILURE: {
      return state
    }

    default: {
      return state
    }
  }
}

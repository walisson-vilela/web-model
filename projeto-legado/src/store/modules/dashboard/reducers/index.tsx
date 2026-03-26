import { WIDGET_TYPES } from '../types'

const initialState = {
  widget13: {
    loading: false,
    data: [],
  },

  widget14: {
    loading: false,
    data: [],
  },

  widget15: {
    loading: false,
    data: [],
  },

  widget16: {
    loading: false,
    data: [],
  },

  widget17: {
    loading: false,
    data: [],
  },

  widget18: {
    loading: false,
    data: [],
  },
  widget19: {
    loading: false,
    data: [],
  },

  widget20: {
    loading: false,
    data: [],
  },

  widget21: {
    loading: false,
    data: [],
  },

  widget22: {
    loading: false,
    data: [],
  },
  widget23: {
    loading: false,
    data: [],
  },

  widget24: {
    loading: false,
    data: [],
  },

  widget25: {
    loading: false,
    data: [],
  },

  widget26: {
    loading: false,
    data: [],
  },

  widget27: {
    loading: false,
    data: [],
  },

  widget28: {
    loading: false,
    data: [],
  },

  widget29: {
    loading: false,
    data: [],
  },

  widget30: {
    loading: false,
    data: [],
  },

  widget31: {
    loading: false,
    data: [],
  },

  widget32: {
    loading: false,
    data: [],
  },

  widget33: {
    loading: false,
    data: [],
  },

  widget34: {
    loading: false,
    data: [],
  },

  widget35: {
    loading: false,
    data: [],
  },

  widget36: {
    loading: false,
    data: [],
  },
  widget37: {
    loading: false,
    data: [],
  },
  widget38: {
    loading: false,
    data: [],
  },

  attendencesModal: {
    loading: false,
    data: [],
  },

  distributionModal: {
    loading: false,
    data: [],
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case WIDGET_TYPES.FETCH_WIDGET13_REQUEST: {
      const newState = { ...state }
      newState.widget13.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET13_SUCCESS: {
      const newState = { ...state }
      newState.widget13.loading = false
      newState.widget13.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET13_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET14_REQUEST: {
      const newState = { ...state }
      newState.widget14.loading = true

      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET14_SUCCESS: {
      const newState = { ...state }
      newState.widget14.loading = false
      newState.widget14.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET14_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET15_REQUEST: {
      const newState = { ...state }
      newState.widget15.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET15_SUCCESS: {
      const newState = { ...state }
      newState.widget15.loading = false
      newState.widget15.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET15_FAILURE: {
      return state
    }
    case WIDGET_TYPES.FETCH_WIDGET16_REQUEST: {
      const newState = { ...state }
      newState.widget16.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET16_SUCCESS: {
      const newState = { ...state }
      newState.widget16.loading = false
      newState.widget16.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET16_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET17_REQUEST: {
      const newState = { ...state }
      newState.widget17.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET17_SUCCESS: {
      const newState = { ...state }
      newState.widget17.loading = false
      newState.widget17.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET17_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET18_REQUEST: {
      const newState = { ...state }
      newState.widget18.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET18_SUCCESS: {
      const newState = { ...state }
      newState.widget18.loading = false
      newState.widget18.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET18_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET19_REQUEST: {
      const newState = { ...state }
      newState.widget19.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET19_SUCCESS: {
      const newState = { ...state }
      newState.widget19.loading = false
      newState.widget19.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET19_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET20_REQUEST: {
      const newState = { ...state }
      newState.widget20.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET20_SUCCESS: {
      const newState = { ...state }
      newState.widget20.loading = false
      newState.widget20.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET20_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET21_REQUEST: {
      const newState = { ...state }
      newState.widget21.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET21_SUCCESS: {
      const newState = { ...state }
      newState.widget21.loading = false
      newState.widget21.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET21_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET22_REQUEST: {
      const newState = { ...state }
      newState.widget22.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET22_SUCCESS: {
      const newState = { ...state }
      newState.widget22.loading = false
      newState.widget22.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET22_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET23_REQUEST: {
      const newState = { ...state }
      newState.widget23.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET23_SUCCESS: {
      const newState = { ...state }
      newState.widget23.loading = false
      newState.widget23.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET23_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET24_REQUEST: {
      const newState = { ...state }
      newState.widget24.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET24_SUCCESS: {
      const newState = { ...state }
      ;(newState.widget24.loading = false),
        (newState.widget24.data = action.payload.data)
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET24_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET25_REQUEST: {
      const newState = { ...state }
      newState.widget25.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET25_SUCCESS: {
      const newState = { ...state }
      ;(newState.widget25.loading = false),
        (newState.widget25.data = action.payload.data)
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET25_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET26_REQUEST: {
      const newState = { ...state }
      newState.widget26.loading = true

      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET26_SUCCESS: {
      const newState = { ...state }
      newState.widget26.loading = false
      newState.widget26.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET26_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET27_REQUEST: {
      const newState = { ...state }
      newState.widget27.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET27_SUCCESS: {
      const newState = { ...state }
      newState.widget27.loading = false
      newState.widget27.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET27_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET28_REQUEST: {
      const newState = { ...state }
      newState.widget28.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET28_SUCCESS: {
      const newState = { ...state }
      newState.widget28.loading = false
      newState.widget28.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET28_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET29_REQUEST: {
      const newState = { ...state }
      newState.widget29.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET29_SUCCESS: {
      const newState = { ...state }
      newState.widget29.loading = false
      newState.widget29.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET29_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET30_REQUEST: {
      const newState = { ...state }
      newState.widget30.loading = true

      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET30_SUCCESS: {
      const newState = { ...state }
      newState.widget30.loading = false
      newState.widget30.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET30_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET31_REQUEST: {
      const newState = { ...state }
      newState.widget31.loading = true

      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET31_SUCCESS: {
      const newState = { ...state }
      newState.widget31.loading = false
      newState.widget31.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET31_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET32_REQUEST: {
      const newState = { ...state }
      newState.widget32.loading = true

      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET32_SUCCESS: {
      const newState = { ...state }
      newState.widget32.loading = false
      newState.widget32.data = action.payload.data

      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET32_FAILURE: {
      return state
    }
    case WIDGET_TYPES.FETCH_WIDGET33_REQUEST: {
      const newState = { ...state }
      newState.widget33.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET33_SUCCESS: {
      const newState = { ...state }
      newState.widget33.loading = false
      newState.widget33.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET33_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET34_REQUEST: {
      const newState = { ...state }
      newState.widget34.loading = true
      return newState
    }
    case WIDGET_TYPES.FETCH_WIDGET34_SUCCESS: {
      const newState = { ...state }
      newState.widget34.loading = false
      newState.widget34.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET34_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET33_SUCCESS: {
      const newState = { ...state }
      newState.widget34.loading = false
      newState.widget34.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET33_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET35_REQUEST: {
      const newState = { ...state }
      newState.widget35.loading = true

      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET35_SUCCESS: {
      const newState = { ...state }
      newState.widget35.loading = false
      newState.widget35.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET35_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET36_REQUEST: {
      const newState = { ...state }
      newState.widget36.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET36_SUCCESS: {
      const newState = { ...state }
      newState.widget36.loading = false
      newState.widget36.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET36_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET37_REQUEST: {
      const newState = { ...state }
      newState.widget37.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET37_SUCCESS: {
      const newState = { ...state }
      newState.widget37.loading = false
      newState.widget37.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET37_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_WIDGET38_REQUEST: {
      const newState = { ...state }
      newState.widget38.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET38_SUCCESS: {
      const newState = { ...state }
      newState.widget38.loading = false
      newState.widget38.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_WIDGET38_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_ATTENDENCES_MODAL_REQUEST: {
      const newState = { ...state }
      newState.attendencesModal.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_ATTENDENCES_MODAL_SUCCESS: {
      const newState = { ...state }
      newState.attendencesModal.loading = false
      newState.attendencesModal.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_ATTENDENCES_MODAL_FAILURE: {
      return state
    }

    case WIDGET_TYPES.FETCH_DISTRIBUTION_MODAL_REQUEST: {
      const newState = { ...state }
      newState.distributionModal.loading = true
      return newState
    }

    case WIDGET_TYPES.FETCH_DISTRIBUTION_MODAL_SUCCESS: {
      const newState = { ...state }
      newState.distributionModal.loading = false
      newState.distributionModal.data = action.payload.data
      return newState
    }

    case WIDGET_TYPES.FETCH_DISTRIBUTION_MODAL_FAILURE: {
      return state
    }
    default: {
      return state
    }
  }
}

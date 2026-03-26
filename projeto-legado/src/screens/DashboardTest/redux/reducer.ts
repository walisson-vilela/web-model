import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { WIDGET_TYPE } from './types'

const widgetState = {
  loading: false,
  data: [],
  error: false,
}
const initialState = {
  w13: { ...widgetState },
  w14: { ...widgetState },
  w15: { ...widgetState },
  w16: { ...widgetState },
  w17: { ...widgetState },
  w18: { ...widgetState },
  w19: { ...widgetState },
  w20: { ...widgetState },
  w21: { ...widgetState },
  w22: { ...widgetState },
  w23S0: { ...widgetState },
  w23S1: { ...widgetState },
  w24: { ...widgetState },
  w25: { ...widgetState },
  w26: { ...widgetState },
  w27: { ...widgetState },
  w28: { ...widgetState },
  w29: { ...widgetState },
  w30: { ...widgetState },
  w31: { ...widgetState },
  w32: { ...widgetState },
  w33: { ...widgetState },
  w34: { ...widgetState },
  w35: { ...widgetState },
  w36: { ...widgetState },
  w37: { ...widgetState },
}

const reducer = (state = initialState, action) => {
  const props = action.props || {}
  const key = props.key || ''

  const payload = action.payload || {}
  let newState = { ...state }

  switch (action.type) {
    case WIDGET_TYPE.START:
      newState[key]['loading'] = true
      return newState

    case WIDGET_TYPE.SUCCESS: {
      newState[key]['loading'] = false
      newState[key]['data'] = payload.data || {}

      return newState
    }

    case WIDGET_TYPE.FAILURE: {
      newState[key]['loading'] = false
      newState[key]['error'] = true

      return newState
    }

    default:
      return state
  }
}

const store = () => {
  return applyMiddleware(thunkMiddleware)(createStore)(reducer)
}

export default store

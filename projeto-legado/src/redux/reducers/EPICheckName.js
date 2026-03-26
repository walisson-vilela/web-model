import { EPICheckNameConstants } from '../../constants/EPIWarehouseConstants'

const initialState = {
  loading: false,
  isValid: null,
  message: '',
}

export default function EPICheckNameReducer(state = initialState, action) {
  const payload = action.payload || {}

  switch (action.type) {
    case EPICheckNameConstants.CHECK_NAME:
      return { ...state, loading: true, message: '', isValid: null }

    case EPICheckNameConstants.CHECK_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        isValid: payload?.exists ? false : true,
        message: payload?.exists ? 'Nome já cadastrado' : '',
      }

    case EPICheckNameConstants.CHECK_NAME_FAILURE:
      return {
        ...state,
        loading: false,
        isValid: false,
        message: 'Erro ao validar nome',
      }

    default:
      return state
  }
}

import * as types from '../types/CropTypes';

const initialState = {
  active: false,
  image: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CROP_ACTIVE: {
      const newState = { ...state }
      newState.active = true;
      return newState;
    }

    case types.CROP_DISACTIVE: {
      const newState = { ...state };
      newState.active = false;
      return newState;
    }

    case types.CROP_SAVE_IMAGE: {
      const newState = { ...state };
      newState.image = action.payload.image
      return newState;
    }

    default: {
      return state;
    }
  }
}

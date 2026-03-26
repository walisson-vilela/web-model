import AppConstrants from '../../constants/AppTypesConstants';
import * as types from '../../constants/NewTable';


const initialState = AppConstrants.defaultState


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_NEW_REQUEST: {
      const newState = { ...state };
      newState.newTableProps.hasLoading = true;
      return newState;
    }


    case types.GET_NEW_REQUEST_SUCCESS: {
      const newState = { ...state }
      newState.newTableProps.hasLoading = false;
      return newState;
    }

    case types.GET_NEW_REQUEST_FAILURE: {
      const newState = { ...state };
      newState.newTablProps.hasLoading = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}

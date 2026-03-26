import { ContractorsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {

  const payload = action.payload || {};
  const props = action.props || {};

  switch (action.type) {

    case ContractorsConstants.FETCH_CONTRACTORS:
      return { ...state, [props.direct ? 'results2' : 'results']: { ...def.results, isLoading: true } };

    case ContractorsConstants.FETCH_CONTRACTORS_SUCCESS:
    case ContractorsConstants.FETCH_CONTRACTORS_FAILURE:

      return { ...state, [props.direct ? 'results2' : 'results']: { ...def.results, ...payload } };

    case ContractorsConstants.GET_CONTRACTOR:
      return {
        ...state,
        results: {
          ...def.results,
          isLoading: true
        }
      };

    case ContractorsConstants.GET_CONTRACTOR_SUCCESS:
    case ContractorsConstants.GET_CONTRACTOR_FAILURE:

      return {
        ...state,
        content: {
          ...def.content,
          result: action.payload
        }
      };

    default:
      return state;
  }
}

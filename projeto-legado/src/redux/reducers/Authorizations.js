import { AuthorizationsConstants } from "../../constants";
import AppTypesConstants from '../../constants/AppTypesConstants';

const def = AppTypesConstants.defaultState;

export default function reducer(state = def, action) {

  let results = state.results;
  const payload = action.payload || {};
  const data = payload.data || [];

  switch (action.type) {
    case AuthorizationsConstants.FETCH_AUTHORIZATIONS:

      return { ...state, results: { ...def.results, isLoading: true } };

    case AuthorizationsConstants.FETCH_AUTHORIZATIONS_SUCCESS:
    case AuthorizationsConstants.FETCH_AUTHORIZATIONS_FAILURE:

      return { ...state, results: { ...def.results, ...payload } };

    case AuthorizationsConstants.TOTALS_AUTHORIZATIONS_RESET:

      results.data = results.data.map((item) => {
        return { ...item, amount: undefined }
      });

      return { ...state, results };

    case AuthorizationsConstants.TOTALS_AUTHORIZATIONS_SUCCESS:

      data.foreach(row => {
        results["data"][row.index]["amount"] = row.amount;
      });

      return { ...state, results };

    default:
      return state;
  }
}

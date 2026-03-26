import { AuthorizationsConstants } from '../../constants/';
import { CrudService } from '../services/';

export const exportAuthorizations = (params) => (dispatch) => {
    return CrudService._get({
        url: "v1/authorizations.xlsx",
        consts: {},
        params,
        dispatch
    });
};

export const fetchAuthorizations = (params) => (dispatch) => {
    return CrudService._get({
        url: "v1/authorizations",
        consts: {
            start: AuthorizationsConstants.FETCH_AUTHORIZATIONS,
            success: AuthorizationsConstants.FETCH_AUTHORIZATIONS_SUCCESS,
            failure: AuthorizationsConstants.FETCH_AUTHORIZATIONS_FAILURE,
        },
        params,
        dispatch
    });
};

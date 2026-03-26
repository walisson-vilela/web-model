import { LocalizationsConstants } from '../../constants';
import { CrudService } from '../services/';

export const fetchLocalizations = (from, to) => (dispatch) => {
    return CrudService._get({
        url: `v1/localizations/index/${from}/${to}`,
        consts: {
            start: LocalizationsConstants.FETCH_LOCALIZATIONS,
            success: LocalizationsConstants.FETCH_LOCALIZATIONS_SUCCESS,
            failure: LocalizationsConstants.FETCH_LOCALIZATIONS_FAILURE,
        },
        undefined,
        dispatch
    });
};
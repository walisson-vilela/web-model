import { ProfilesConstants } from '../../constants';
import { CrudActions } from "./AppActions";

export const fetchProfiles = (params) => (dispatch) => {
    return CrudActions._get('v1/profiles', {
        start: ProfilesConstants.FETCH_PROFILES,
        success: ProfilesConstants.FETCH_PROFILES_SUCCESS,
        failure: ProfilesConstants.FETCH_PROFILES_FAILURE,
    }, params, dispatch);
};

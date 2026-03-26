import { RoutesMarkersConstants } from '../../constants';
import { CrudActions } from "./AppActions";

export const postRouteMarkers = (params) => (dispatch) => {
    return CrudActions._post(`v1/route-markers`, {
        start: RoutesMarkersConstants.POST_ROUTES_MARKERS,
        success: RoutesMarkersConstants.POST_ROUTES_MARKERS_SUCCESS,
        failure: RoutesMarkersConstants.POST_ROUTES_MARKERS_FAILURE,
    }, params, dispatch);
};

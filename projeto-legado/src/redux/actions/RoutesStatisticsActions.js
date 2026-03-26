import { RoutesStatisticsConstants } from '../../constants';
import { CrudActions } from "./AppActions";

export const getRoutesStatistics = (zone, params) => (dispatch) => {
    return CrudActions._get(`v1/route-statistics/by-zone/${zone}`, {
        start: RoutesStatisticsConstants.GET_ROUTES_STATISTICS,
        success: RoutesStatisticsConstants.GET_ROUTES_STATISTICS_SUCCESS,
        failure: RoutesStatisticsConstants.GET_ROUTES_STATISTICS_FAILURE,
    }, params, dispatch);
};

export const getRoutesStatisticsByVersion = (version, params) => (dispatch) => {
    return CrudActions._get(`v1/route-statistics/by-version/${version}`, {
        start: RoutesStatisticsConstants.GET_ROUTES_STATISTICS_BY_VERSION,
        success: RoutesStatisticsConstants.GET_ROUTES_STATISTICS_BY_VERSION_SUCCESS,
        failure: RoutesStatisticsConstants.GET_ROUTES_STATISTICS_BY_VERSION_FAILURE,
    }, params, dispatch);
};

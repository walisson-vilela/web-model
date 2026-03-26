import { RoutesVersionEventsConstants } from '../../constants'
import { CrudService } from '../services/'

export const fetchRouteEvents = (route_id, params) => (dispatch) => {
  return CrudService._get({
    url: `v1/route-versions/${route_id}/events`,
    consts: {
      start: RoutesVersionEventsConstants.FETCH_ROUTES_VERSION_EVENTS,
      success: RoutesVersionEventsConstants.FETCH_ROUTES_VERSION_EVENTS_SUCCESS,
      failure: RoutesVersionEventsConstants.FETCH_ROUTES_VERSION_EVENTS_FAILURE,
    },
    params,
    dispatch,
  })
}

export const postRouteEvents = (route_id, content) => (dispatch) => {
  return CrudService._post({
    url: `v1/route-versions/${route_id}/events`,
    consts: {
      start: RoutesVersionEventsConstants.POST_ROUTES_VERSION_EVENTS,
      success: RoutesVersionEventsConstants.POST_ROUTES_VERSION_EVENTS_SUCCESS,
      failure: RoutesVersionEventsConstants.POST_ROUTES_VERSION_EVENTS_FAILURE,
    },
    data: content,
    dispatch,
  })
}

export const putRouteEvents = (id, event, params) => (dispatch) => {
  return CrudService._put({
    url: `v1/route-versions/${id}/events/${event}`,
    consts: {
      start: RoutesVersionEventsConstants.PUT_ROUTES_VERSION_EVENTS,
      success: RoutesVersionEventsConstants.PUT_ROUTES_VERSION_EVENTS_SUCCESS,
      failure: RoutesVersionEventsConstants.PUT_ROUTES_VERSION_EVENTS_FAILURE,
    },
    data: params,
    dispatch,
  })
}

export const getRouteConflicts = (version_id) => (dispatch) => {
  return CrudService._get({
    url: `v1/route-versions/${version_id}/events/conflicts`,
    consts: {
      start: RoutesVersionEventsConstants.CONFLICTS_ROUTES_VERSION,
      success: RoutesVersionEventsConstants.CONFLICTS_ROUTES_VERSION_SUCCESS,
      failure: RoutesVersionEventsConstants.CONFLICTS_ROUTES_VERSION_FAILURE,
    },
    undefined,
    dispatch,
  })
}

export const fetchRouteEventsParents = (version, date) => (dispatch) => {
  return CrudService._get({
    url: `v1/route-versions/${version}/events/parents/${date}`,
    consts: {
      start: RoutesVersionEventsConstants.FETCH_ROUTES_VERSION_EVENTS_PARENTS,
      success:
        RoutesVersionEventsConstants.FETCH_ROUTES_VERSION_EVENTS_PARENTS_SUCCESS,
      failure:
        RoutesVersionEventsConstants.FETCH_ROUTES_VERSION_EVENTS_PARENTS_FAILURE,
    },
    undefined,
    dispatch,
  })
}

export const deleteRouteEventsByDates = (version_id, params) => (dispatch) => {
  return CrudService._delete({
    url: `v1/route-versions/${version_id}/events/delete-by-dates`,
    consts: {
      start: RoutesVersionEventsConstants.DELETE_ROUTES_VERSION_EVENTS_DATES,
      success:
        RoutesVersionEventsConstants.DELETE_ROUTES_VERSION_EVENTS_DATES_SUCCESS,
      failure:
        RoutesVersionEventsConstants.DELETE_ROUTES_VERSION_EVENTS_DATES_FAILURE,
    },
    data: params,
    dispatch,
  })
}

import RoutesConstants from '../../constants/RoutesConstants'
import { CrudService } from '../services/'

export const fetchRoutes = (params) => (dispatch) => {
  return CrudService._get({
    url: 'v1/routes',
    consts: {
      start: RoutesConstants.FETCH_ROUTES,
      success: RoutesConstants.FETCH_ROUTES_SUCCESS,
      failure: RoutesConstants.FETCH_ROUTES_FAILURE,
    },
    params,
    dispatch,
  })
}

export const getRoutes = (id) => (dispatch) => {
  return CrudService._get({
    url: `v1/routes/${id}`,
    consts: {
      start: RoutesConstants.GET_ROUTES,
      success: RoutesConstants.GET_ROUTES_SUCCESS,
      failure: RoutesConstants.GET_ROUTES_FAILURE,
    },
    dispatch,
  })
}

export const postRoutes = (content) => (dispatch) => {
  return CrudService._post({
    url: `v1/routes/add`,
    consts: {
      start: RoutesConstants.POST_ROUTES,
      success: RoutesConstants.POST_ROUTES_SUCCESS,
      failure: RoutesConstants.POST_ROUTES_FAILURE,
    },
    data: content,
    dispatch,
  })
}

export const deleteRoutes = (ids) => (dispatch) => {
  const id = ids[0]
  return CrudService._delete({
    url: `v1/routes/delete/${id}`,
    data: {
      ids,
    },
    consts: {
      start: RoutesConstants.DELETE_ROUTES,
      success: RoutesConstants.DELETE_ROUTES_SUCCESS,
      failure: RoutesConstants.DELETE_ROUTES_FAILURE,
    },
    dispatch,
  })
}

// export const removeDraftVersion = (id) => (dispatch) => {
//     return CrudService._delete({
//         url: `v1/routes/remove-draft/${id}`,
//         consts: {
//             start: RoutesConstants.DELETE_ROUTES,
//             success: RoutesConstants.DELETE_ROUTES_SUCCESS,
//             failure: RoutesConstants.DELETE_ROUTES_FAILURE,
//         },
//         undefined,
//         dispatch
//     });
// };

export const deleteRoute = (id) => (dispatch) => {
  return CrudService._delete({
    url: `v1/routes/${id}`,
    consts: {
      start: RoutesConstants.DELETE_ROUTE,
      success: RoutesConstants.DELETE_ROUTE_SUCCESS,
      failure: RoutesConstants.DELETE_ROUTE_FAILURE,
    },
    undefined,
    dispatch,
  })
}

export const removeDraftVersion = (id) => (dispatch) => {
  return CrudService._delete({
    url: `v1/routes/remove-draft/${id}`,
    consts: {
      start: RoutesConstants.DELETE_ROUTE,
      success: RoutesConstants.DELETE_ROUTE_SUCCESS,
      failure: RoutesConstants.DELETE_ROUTE_FAILURE,
    },
    undefined,
    dispatch,
  })
}

export const changeParamsRoutes = (id, data) => (dispatch) => {
  return CrudService._put({
    url: `v1/routes/${id}/change-params`,
    consts: {
      start: RoutesConstants.CHANGE_NAME_ROUTES,
      success: RoutesConstants.CHANGE_NAME_ROUTES_SUCCESS,
      failure: RoutesConstants.CHANGE_NAME_ROUTES_FAILURE,
    },
    data,
    dispatch,
  })
}

export const cloneRoute = (id) => (dispatch) => {
  return CrudService._get({
    url: `v1/routes/clone/${id}`,
    consts: {
      start: RoutesConstants.CLONE_ROUTES,
      success: RoutesConstants.CLONE_ROUTES_SUCCESS,
      failure: RoutesConstants.CLONE_ROUTES_FAILURE,
    },
    undefined,
    dispatch,
  })
}

export const publishRoute = (params) => (dispatch) => {
  return CrudService._post({
    url: `v1/routes/publish`,
    consts: {
      start: RoutesConstants.PUBLISH_ROUTES,
      success: RoutesConstants.PUBLISH_ROUTES_SUCCESS,
      failure: RoutesConstants.PUBLISH_ROUTES_FAILURE,
    },
    data: params,
    dispatch,
  })
}

export const unpublishRoute = (params) => (dispatch) => {
  return CrudService._post({
    url: `v1/routes/unpublish`,
    consts: {
      start: RoutesConstants.PUBLISH_ROUTES,
      success: RoutesConstants.PUBLISH_ROUTES_SUCCESS,
      failure: RoutesConstants.PUBLISH_ROUTES_FAILURE,
    },
    data: params,
    dispatch,
  })
}

export const optimizeRouteEvents = (data) => (dispatch) => {
  return CrudService._post({
    url: 'v1/routes/optimize',
    consts: {
      start: false,
      success: false,
      failure: false,
    },
    data,
    dispatch,
  })
}

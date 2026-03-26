import { RoutesVersionsConstants } from '../../constants'

import { CrudActions } from './AppActions'

export const getRoutesVersions = (id, version, params) => (dispatch) => {
  return CrudActions._get(
    `v1/routes/${id}/versions/${version}`,
    {
      start: RoutesVersionsConstants.GET_ROUTES_VERSIONS,
      success: RoutesVersionsConstants.GET_ROUTES_VERSIONS_SUCCESS,
      failure: RoutesVersionsConstants.GET_ROUTES_VERSIONS_FAILURE,
    },
    params,
    dispatch,
  )
}

export const putRoutesVersions = (id, version, params) => (dispatch) => {
  return CrudActions._put(
    `v1/routes/${id}/versions/${version}`,
    {
      start: RoutesVersionsConstants.PUT_ROUTES_VERSIONS,
      success: RoutesVersionsConstants.PUT_ROUTES_VERSIONS_SUCCESS,
      failure: RoutesVersionsConstants.PUT_ROUTES_VERSIONS_FAILURE,
    },
    params,
    dispatch,
  )
}

export const deleteRoutesVersions = (id, version) => (dispatch) => {
  return CrudActions._delete(
    `v1/routes/${id}/versions/${version}`,
    {
      start: RoutesVersionsConstants.DELETE_ROUTES_VERSIONS,
      success: RoutesVersionsConstants.DELETE_ROUTES_VERSIONS_SUCCESS,
      failure: RoutesVersionsConstants.DELETE_ROUTES_VERSIONS_FAILURE,
    },
    {},
    dispatch,
  )
}

export const clearRoutesVersions = (id, version) => (dispatch) => {
  return CrudActions._get(
    `v1/routes/${id}/versions/${version}/clear`,
    {
      start: RoutesVersionsConstants.CLEAR_ROUTES_VERSIONS,
      success: RoutesVersionsConstants.CLEAR_ROUTES_VERSIONS_SUCCESS,
      failure: RoutesVersionsConstants.CLEAR_ROUTES_VERSIONS_FAILURE,
    },
    undefined,
    dispatch,
  )
}

export const persistRoutesVersions = (id, version, params) => (dispatch) => {
  return CrudActions._get(
    `v1/routes/${id}/versions/${version}/persist`,
    {
      start: RoutesVersionsConstants.PERSIST_ROUTES_VERSIONS,
      success: RoutesVersionsConstants.PERSIST_ROUTES_VERSIONS_SUCCESS,
      failure: RoutesVersionsConstants.PERSIST_ROUTES_VERSIONS_FAILURE,
    },
    params,
    dispatch,
  )
}

export const discardRoutesVersions = (id) => (dispatch) => {
  return CrudActions._get(
    `v1/routes/${id}/versions/discard`,
    {
      start: false,
      success: false,
      failure: false,
    },
    {},
    dispatch,
  )
}

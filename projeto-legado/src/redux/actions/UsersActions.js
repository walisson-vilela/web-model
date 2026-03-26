import { JourneyConstants, UsersConstants } from '../../constants'
import { CrudService } from '../services/'

import { CrudActions } from './AppActions'

export const getUser = (id) => (dispatch) => {
  return CrudActions._get(
    `v1/users/${id}`,
    {
      start: UsersConstants.GET_USERS,
      success: UsersConstants.GET_USERS_SUCCESS,
      failure: UsersConstants.GET_USERS_FAILURE,
    },
    undefined,
    dispatch,
  )
}

export const getJourney = (registry) => (dispatch) => {
  return CrudService._get({
    url: `v1/users/journey/${registry}`,
    consts: {
      start: JourneyConstants.FETCH_ROUTES_VERSION_EVENTS,
      success: JourneyConstants.FETCH_ROUTES_VERSION_EVENTS_SUCCESS,
      failure: JourneyConstants.FETCH_ROUTES_VERSION_EVENTS_FAILURE,
    },
    dispatch,
  })
}

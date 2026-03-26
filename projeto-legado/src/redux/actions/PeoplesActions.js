import PeoplesConstants from '../../constants/PeoplesConstants'
import { CrudService } from '../services/'

export const fetchPeoples = (params) => (dispatch) => {
  return CrudService._get({
    url: 'v1/peoples',
    consts: {
      start: PeoplesConstants.FETCH_PEOPLES,
      success: PeoplesConstants.FETCH_PEOPLES_SUCCESS,
      failure: PeoplesConstants.FETCH_PEOPLES_FAILURE,
    },
    params,
    dispatch,
  })
}

export const findPeoples = (params) => (dispatch) => {
  return CrudService._get({
    url: `v1/peoples`,
    consts: {
      start: PeoplesConstants.FIND_PEOPLES,
      success: PeoplesConstants.FIND_PEOPLES_SUCCESS,
      failure: PeoplesConstants.FIND_PEOPLES_FAILURE,
    },
    params,
    dispatch,
  })
}

export const withoutRoutePeoples = (people, params) => (dispatch) => {
  params['enrollment'] = people
  params['no-paginate'] = 1
  params['group_by_people'] = 1

  return CrudService._get({
    url: `/v1/peoples`,
    consts: {
      start: PeoplesConstants.WITHOUT_ROUTE_PEOPLES,
      success: PeoplesConstants.WITHOUT_ROUTE_PEOPLES_SUCCESS,
      failure: PeoplesConstants.WITHOUT_ROUTE_PEOPLES_FAILURE,
    },
    params,
    dispatch,
  })
}

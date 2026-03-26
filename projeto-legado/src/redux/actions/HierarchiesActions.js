import { HierarchiesConstants } from '../../constants'
import { CrudService } from '../services/'

export const fetchHierarchies = (params) => (dispatch) => {
  return CrudService._get({
    url: 'v1/hierarchies',
    consts: {
      start: HierarchiesConstants.FETCH_HIERARCHIES,
      success: HierarchiesConstants.FETCH_HIERARCHIES_SUCCESS,
      failure: HierarchiesConstants.FETCH_HIERARCHIES_FAILURE,
    },
    params,
    dispatch,
  })
}

export const getHierarchiesLinksByParams =
  (hierarchy_id, params) => (dispatch) => {
    return CrudService._get({
      url: `v1/hierarchies/${hierarchy_id}/links`,
      params,
      consts: {
        start: HierarchiesConstants.GET_HIERARCHIES_PEOPLE,
        success: HierarchiesConstants.GET_HIERARCHIES_PEOPLE_SUCCESS,
        failure: HierarchiesConstants.GET_HIERARCHIES_PEOPLE_FAILURE,
      },
      undefined,
      dispatch,
    })
  }

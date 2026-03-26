import { EPIDistribuitonsConstants } from '../../constants'
import { CrudService } from '../services'

export const addEpiDraftDistribution =
  (data = {}) =>
  async (dispatch) => {
    return CrudService._post({
      url: '/v1/epi-draft-distributions/add',
      consts: {
        start: EPIDistribuitonsConstants.ADD_EPI_DRAFT_DISTRIBUTIONS,
        success: EPIDistribuitonsConstants.ADD_EPI_DRAFT_DISTRIBUTIONS_SUCCESS,
        failure: EPIDistribuitonsConstants.ADD_EPI_DRAFT_DISTRIBUTIONS_FAILURE,
      },
      data,
      dispatch,
    })
  }

export const updateEpiDraftDistribution =
  (id, data = {}) =>
  async (dispatch) => {
    return CrudService._put({
      url: `/v1/epi-draft-distributions/${id}`,
      consts: {
        start: EPIDistribuitonsConstants.UPDATE_EPI_DRAFT_DISTRIBUTIONS,
        success:
          EPIDistribuitonsConstants.UPDATE_EPI_DRAFT_DISTRIBUTIONS_SUCCESS,
        failure:
          EPIDistribuitonsConstants.UPDATE_EPI_DRAFT_DISTRIBUTIONS_FAILURE,
      },
      data,
      dispatch,
    })
  }

export const viewEpiDraftDistribution = (id) => async (dispatch) => {
  return CrudService._get({
    url: `/v1/epi-draft-distributions/${id}`,
    consts: {
      start: EPIDistribuitonsConstants.VIEW_EPI_DRAFT_DISTRIBUTIONS,
      success: EPIDistribuitonsConstants.VIEW_EPI_DRAFT_DISTRIBUTIONS_SUCCESS,
      failure: EPIDistribuitonsConstants.VIEW_EPI_DRAFT_DISTRIBUTIONS_FAILURE,
    },
    dispatch,
  })
}

export const fetchDraftMissingEpis =
  (id, params = {}) =>
  async (dispatch) => {
    return CrudService._get({
      url: `/v1/epi-draft-distributions/${id}/draft-missing-epis`,
      params,
      consts: {
        start: EPIDistribuitonsConstants.DRAFT_MISSING_EPIS,
        success: EPIDistribuitonsConstants.DRAFT_MISSING_EPIS_SUCCESS,
        failure: EPIDistribuitonsConstants.DRAFT_MISSING_EPIS_FAILURE,
      },
      dispatch,
    })
  }

export const distributeEpiDistribution =
  (data = {}) =>
  async (dispatch) => {
    return CrudService._post({
      url: '/v1/epi-distributions/distribute',
      consts: {
        start: EPIDistribuitonsConstants.DISTRIBUTE_EPI_DISTRIBUTIONS,
        success: EPIDistribuitonsConstants.DISTRIBUTE_EPI_DISTRIBUTIONS_SUCCESS,
        failure: EPIDistribuitonsConstants.DISTRIBUTE_EPI_DISTRIBUTIONS_FAILURE,
      },
      data,
      dispatch,
    })
  }

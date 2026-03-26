import { ContractorsConstants } from '../../constants'
import { CrudService } from '../services/'

export const fetchContractorGroup = (contractor_id, params) => (dispatch) =>
  CrudService._get({
    url: `/v1/contractors/${contractor_id}/groups`,
    consts: {
      start: ContractorsConstants.FETCH_CONTRACTOR_GROUP,
      success: ContractorsConstants.FETCH_CONTRACTOR_GROUP_SUCCESS,
      failure: ContractorsConstants.FETCH_CONTRACTOR_GROUP_FAILURE,
    },
    params,
    dispatch,
  })

export const fetchContractors =
  (params = {}, props = {}) =>
  (dispatch) =>
    CrudService._get({
      url: `/v1/tr/contractors/options?no-paginate=1&limit=100`,
      consts: {
        start: ContractorsConstants.FETCH_CONTRACTORS,
        success: ContractorsConstants.FETCH_CONTRACTORS_SUCCESS,
        failure: ContractorsConstants.FETCH_CONTRACTORS_FAILURE,
      },
      props,
      params,
      dispatch,
    })

export const deleteContractor = (id) => (dispatch) =>
  CrudService._delete({
    url: `/v1/contractors/${id}`,
    consts: {},
    dispatch,
  })

export const getContractorGroup = (contractor_id, id, params) => (dispatch) =>
  CrudService._get({
    url: `/v1/contractors/${contractor_id}/groups/${id}`,
    consts: {
      start: ContractorsConstants.GET_CONTRACTOR_GROUP,
      success: ContractorsConstants.GET_CONTRACTOR_GROUP_SUCCESS,
      failure: ContractorsConstants.GET_CONTRACTOR_GROUP_FAILURE,
    },
    params,
    dispatch,
  })

export const deleteContractorGroup = (contractor_id, id) => (dispatch) =>
  CrudService._delete({
    url: `/v1/contractors/${contractor_id}/groups/${id}`,
    consts: {
      start: ContractorsConstants.DELETE_CONTRACTOR_GROUP,
      success: ContractorsConstants.DELETE_CONTRACTOR_GROUP_SUCCESS,
      failure: ContractorsConstants.DELETE_CONTRACTOR_GROUP_FAILURE,
    },
    undefined,
    dispatch,
  })

export const putContractorGroup = (contractor_id, id, data) => (dispatch) =>
  CrudService._put({
    url: `/v1/contractors/${contractor_id}/groups/${id}`,
    consts: {
      start: ContractorsConstants.PUT_CONTRACTOR_GROUP,
      success: ContractorsConstants.PUT_CONTRACTOR_GROUP_SUCCESS,
      failure: ContractorsConstants.PUT_CONTRACTOR_GROUP_FAILURE,
    },
    data,
    dispatch,
  })

export const postContractorGroup = (contractor_id, data) => (dispatch) =>
  CrudService._post({
    url: `/v1/contractors/${contractor_id}/groups`,
    consts: {
      start: ContractorsConstants.POST_CONTRACTOR_GROUP,
      success: ContractorsConstants.POST_CONTRACTOR_GROUP_SUCCESS,
      failure: ContractorsConstants.POST_CONTRACTOR_GROUP_FAILURE,
    },
    data,
    dispatch,
  })

export const fetchContractorSub = (params) => (dispatch) =>
  CrudService._get({
    url: '/v1/subcontractors',
    consts: {
      start: ContractorsConstants.FETCH_CONTRACTOR_SUB,
      success: ContractorsConstants.FETCH_CONTRACTOR_SUB_SUCCESS,
      failure: ContractorsConstants.FETCH_CONTRACTOR_GROUP_FAILURE,
    },
    params,
    dispatch,
  })

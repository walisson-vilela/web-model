import {
  EPICheckNameConstants,
  EPIWarehouseConstants,
} from '../../constants/EPIWarehouseConstants'
import { CrudService } from '../services'

/**
 * @param {Object} params - Parâmetros da requisição (contain, page, limit, sort)
 */
export const fetchEPIWarehouse =
  (params = {}) =>
  (dispatch) =>
    CrudService._get({
      url: `/v1/epis/`,
      consts: {
        start: EPIWarehouseConstants.FETCH_EPIWAREHOUSE,
        success: EPIWarehouseConstants.FETCH_EPIWAREHOUSE_SUCCESS,
        failure: EPIWarehouseConstants.FETCH_EPIWAREHOUSE_FAILURE,
      },
      params,
      dispatch,
    })

export const fetchEPITypes =
  (params = {}) =>
  (dispatch) =>
    CrudService._get({
      url: `/v1/epi-types`,
      consts: {
        start: EPIWarehouseConstants.FETCH_EPIS_TYPES,
        success: EPIWarehouseConstants.FETCH_EPIS_TYPES_SUCCESS,
        failure: EPIWarehouseConstants.FETCH_EPIS_TYPES_FAILURE,
      },
      params: {
        contain: 'Epis',
        page: 1,
        limit: 99999,
        ...params,
      },
      dispatch,
    })

export const fetchEPICheckName =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await CrudService._post({
        url: `/v1/epi-types/check-name`,
        consts: {
          start: EPICheckNameConstants.CHECK_NAME,
          success: EPICheckNameConstants.CHECK_NAME_SUCCESS,
          failure: EPICheckNameConstants.CHECK_NAME_FAILURE,
        },
        data: params,
        dispatch,
      })

      return response
    } catch (error) {
      throw error
    }
  }

/**
 * Adiciona um novo tipo de EPI
 * @param {Object} params - Dados do formulário
 * @returns {Function}
 */
export const addEPIType =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await CrudService._post({
        url: `/v1/epi-types/add`,
        consts: {
          start: EPIWarehouseConstants.ADD_EPITYPE,
          success: EPIWarehouseConstants.ADD_EPITYPE_SUCCESS,
          failure: EPIWarehouseConstants.ADD_EPITYPE_FAILURE,
        },
        data: params,
        dispatch,
      })

      return response
    } catch (error) {
      throw error
    }
  }

/**
 * Atualiza
 * @param {number} id - ID do EPI
 * @param {Object} data
 * @returns {Function}
 */
export const updateEPI =
  (id, data = {}) =>
  async (dispatch) => {
    try {
      const response = await CrudService._put({
        url: `/v1/epis/${id}`,
        consts: {
          start: EPIWarehouseConstants.UPDATE_EPI,
          success: EPIWarehouseConstants.UPDATE_EPI_SUCCESS,
          failure: EPIWarehouseConstants.UPDATE_EPI_FAILURE,
        },
        data,
        dispatch,
      })

      return response
    } catch (error) {
      throw error
    }
  }

export const deleteEPI = (id) => async (dispatch) => {
  try {
    const response = await CrudService._delete({
      url: `/v1/epis/${id}`,
      consts: {
        start: EPIWarehouseConstants.DELETE_EPI,
        success: EPIWarehouseConstants.DELETE_EPI_SUCCESS,
        failure: EPIWarehouseConstants.DELETE_EPI_FAILURE,
      },
      dispatch,
    })

    return response
  } catch (error) {
    throw error
  }
}

export const getEPIDecrease =
  (params = {}) =>
  (dispatch) =>
    CrudService._get({
      url: `/v1/epi-inventory-manual-decreases`,
      consts: {
        start: EPIWarehouseConstants.GET_DECREASE,
        success: EPIWarehouseConstants.GET_DECREASE_SUCCESS,
        failure: EPIWarehouseConstants.GET_DECREASE_FAILURE,
      },
      params,
      dispatch,
    })

export const addEPIInventoryManualDecreaseAdd =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await CrudService._post({
        url: `/v1/epi-inventory-manual-decreases/add`,
        consts: {
          start: EPIWarehouseConstants.EPI_INVENTORY_MANUAL_DECREASE_ADD,
          success:
            EPIWarehouseConstants.EPI_INVENTORY_MANUAL_DECREASE_ADD_SUCCESS,
          failure:
            EPIWarehouseConstants.EPI_INVENTORY_MANUAL_DECREASE_ADD_FAILURE,
        },
        data: params,
        dispatch,
      })

      return response
    } catch (error) {
      throw error
    }
  }

export const updateEPITypeSizes = (epiTypeId, payload) => async (dispatch) => {
  try {
    const response = await CrudService._put({
      url: `/v1/epi-types/edit/${epiTypeId}`,
      consts: {
        start: EPIWarehouseConstants.UPDATE_EPITYPE_SIZES,
        success: EPIWarehouseConstants.UPDATE_EPITYPE_SIZES_SUCCESS,
        failure: EPIWarehouseConstants.UPDATE_EPITYPE_SIZES_FAILURE,
      },

      data: payload,
      dispatch,
    })

    return response
  } catch (error) {
    throw error
  }
}

export const fetchEPIs =
  (params = {}) =>
  (dispatch) =>
    CrudService._get({
      url: `/v1/epis/`,
      consts: {
        start: EPIWarehouseConstants.FETCH_EPIS,
        success: EPIWarehouseConstants.FETCH_EPIS_SUCCESS,
        failure: EPIWarehouseConstants.FETCH_EPIS_FAILURE,
      },
      params,
      dispatch,
    })

export const addEPITrade =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await CrudService._post({
        url: `/v1/epis/trade`,
        consts: {
          start: EPIWarehouseConstants.ADD_EPIS_TRADE,
          success: EPIWarehouseConstants.ADD_EPIS_TRADESUCCESS,
          failure: EPIWarehouseConstants.ADD_EPIS_TRADE_FAILURE,
        },
        data: params,
        dispatch,
      })

      return response
    } catch (error) {
      throw error
    }
  }

export const fetchEPIFiscalNotes =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await CrudService._get({
        url: `/v1/epi-fiscal-notes`,
        consts: {
          start: EPIWarehouseConstants.FETCH_EPI_FISCAL_NOTES,
          success: EPIWarehouseConstants.FETCH_EPI_FISCAL_NOTES_SUCCESS,
          failure: EPIWarehouseConstants.FETCH_EPI_FISCAL_NOTES_FAILURE,
        },
        params,
        dispatch,
      })

      return response
    } catch (error) {
      throw error
    }
  }

export const addEPIFiscalNote =
  (params = {}) =>
  async (dispatch) => {
    console.log('params', params)
    try {
      const response = await CrudService._post({
        url: `/v1/epi-fiscal-notes/add`,
        consts: {
          start: EPIWarehouseConstants.ADD_EPI_FISCAL_NOTE,
          success: EPIWarehouseConstants.ADD_EPI_FISCAL_NOTE_SUCCESS,
          failure: EPIWarehouseConstants.ADD_EPI_FISCAL_NOTE_FAILURE,
        },
        data: params,
        dispatch,
      })

      return response
    } catch (error) {
      throw error
    }
  }

export const deleteFiscalNote = (id) => async (dispatch) => {
  try {
    const response = await CrudService._delete({
      url: `/v1/epi-fiscal-notes/${id}`,
      consts: {
        start: EPIWarehouseConstants.DELETE_FISCAL_NOTE,
        success: EPIWarehouseConstants.DELETE_FISCAL_NOTE_SUCCESS,
        failure: EPIWarehouseConstants.DELETE_FISCAL_NOTE_FAILURE,
      },
      dispatch,
    })

    return response
  } catch (error) {
    throw error
  }
}

export const filterPurchaseDate =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await CrudService._get({
        url: `/v1/epi-fiscal-notes`,
        consts: {
          start: EPIWarehouseConstants.FILTER_PURCHASE_DATE,
          success: EPIWarehouseConstants.FILTER_PURCHASE_DATE_SUCCESS,
          failure: EPIWarehouseConstants.FILTER_PURCHASE_DATE_FAILURE,
        },
        params,
        dispatch,
      })

      return response
    } catch (error) {
      console.error('Erro no filtro por data:', error)
      throw error
    }
  }

export const fetchFiscalNoteById = (id) => async (dispatch) => {
  try {
    const response = await CrudService._get({
      url: `/v1/epi-fiscal-notes/${id}`,
      consts: {
        start: EPIWarehouseConstants.FETCH_FISCAL_NOTE_BY_ID,
        success: EPIWarehouseConstants.FETCH_FISCAL_NOTE_BY_ID_SUCCESS,
        failure: EPIWarehouseConstants.FETCH_FISCAL_NOTE_BY_ID_FAILURE,
      },
      dispatch,
    })

    return response?.data
  } catch (error) {
    console.error('Erro ao buscar nota fiscal por ID:', error)
    throw error
  }
}

export const fetchEPIQuantity =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await CrudService._get({
        url: `/v1/epi-fiscal-notes/epis`,
        consts: {
          start: EPIWarehouseConstants.FETCH_EPI_QUANTITY,
          success: EPIWarehouseConstants.FETCH_EPI_QUANTITY_SUCCESS,
          failure: EPIWarehouseConstants.FETCH_EPI_QUANTITY_FAILURE,
        },
        params,
        dispatch,
      })

      return response?.data
    } catch (error) {
      console.error('Erro ao buscar nota fiscal por ID:', error)
      throw error
    }
  }

export const updateFiscalNote = (id, payload) => async (dispatch) => {
  try {
    const response = await CrudService._put({
      url: `/v1/epi-fiscal-notes/${id}`,
      consts: {
        start: EPIWarehouseConstants.UPDATE_FISCAL_NOTE_BY_ID,
        success: EPIWarehouseConstants.UPDATE_FISCAL_NOTE_BY_ID_SUCCESS,
        failure: EPIWarehouseConstants.UPDATE_FISCAL_NOTE_BY_ID_FAILURE,
      },
      data: payload,
      dispatch,
    })

    return response
  } catch (error) {
    console.error('Erro ao atualizar nota fiscal por ID:', error)
    throw error
  }
}

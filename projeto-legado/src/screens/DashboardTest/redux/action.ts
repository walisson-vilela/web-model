import { CrudService } from '../../../redux/services'

import { WIDGET_TYPE } from './types'

/** @deprecated */
export const getWidgetData = (id, method, url, data = {}, params = {}) =>
  ((dispatch) => {
    const options = {
      url,
      consts: {
        start: WIDGET_TYPE.START,
        success: WIDGET_TYPE.SUCCESS,
        failure: WIDGET_TYPE.FAILURE,
      },
      data,
      params,
      dispatch,
      props: {
        key: `w${id}`,
      },
    }
    if (method === 'GET') {
      CrudService._get(options)
    } else {
      CrudService._post(options)
    }
  }) as never

import axios from '../../../services/Axios/instance'
import { booleanOrDefault } from '../../Formatters'
import { isObject } from '../../Validators'

import { CreateRequestFunction } from './interfaces'

const createRequest: CreateRequestFunction = ({ url, aditionalParams }) => {
  return async (q, page, abortController) => {
    const params: Exclude<typeof aditionalParams, undefined> & {
      q?: string
      page?: number
    } = {
      page,
      ...(aditionalParams || {}),
    }

    if (q) params.q = q

    try {
      const axiosResponse = await axios.get(url, {
        params,
        signal: abortController.signal,
      })

      // request was aborted
      if (axiosResponse === undefined && abortController.signal.aborted) {
        return null
      }

      const { data: response } = axiosResponse

      if (!isObject(response) || !Array.isArray(response.data)) {
        throw new Error('Invalid response')
      }

      const result = {
        lastPage: true,
        data: response.data,
      }

      if (isObject(response.pagination)) {
        result.lastPage = !booleanOrDefault(
          response.pagination.has_next_page,
          result.lastPage,
        )
      }

      return result
    } catch (e) {
      console.error(e)
      return null
    }
  }
}

export default createRequest

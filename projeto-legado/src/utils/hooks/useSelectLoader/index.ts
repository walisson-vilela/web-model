import useAbortRequest from '../useAbortRequest'

import { UseSelectLoaderFunction } from './interfaces'
import defaultParser from './parser'
import createRequest from './request'

const useSelectLoader: UseSelectLoaderFunction = (args) => {
  const { request, parser } = {
    request:
      typeof args.request === 'function'
        ? args.request
        : createRequest(args.request),
    parser: args.parser || defaultParser,
  }

  const { startRequest } = useAbortRequest()

  if (args.invalid) return async () => []

  return async (search: string, page: number) => {
    const abortController = startRequest()

    const result = await request(search, page, abortController)
    if (result === null) return null

    const options = parser(result.data)

    return {
      lastPage: result.lastPage,
      options,
    }
  }
}

export default useSelectLoader

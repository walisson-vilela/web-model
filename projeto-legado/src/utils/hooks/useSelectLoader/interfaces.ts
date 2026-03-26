import { GenericObject, SelectLoader, SelectOption } from '@mw-kit/mw-ui/types'

export type Response = {
  lastPage: boolean
  data: any[]
}

export type RequestFunction = (
  search: string,
  page: number,
  abortController: AbortController,
) => Promise<Response | null>

export type CreateRequestFunction = (args: {
  url: string
  aditionalParams?: Record<string | number | symbol, any>
}) => RequestFunction

export type ParserFunction<T extends GenericObject = GenericObject> = (
  data: Response['data'],
) => SelectOption<T>[]

export type UseSelectLoaderFunction = <
  T extends GenericObject = GenericObject,
>(args: {
  request: RequestFunction | Parameters<CreateRequestFunction>[0]
  parser?: ParserFunction<T>
  invalid?: boolean
}) => SelectLoader

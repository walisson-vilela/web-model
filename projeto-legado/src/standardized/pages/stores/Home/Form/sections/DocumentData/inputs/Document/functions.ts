import {
  ResponseBaseStoreDataId,
  ResponseBaseStoreYourself,
} from '../../../../services/checkDocument'

export const isResponseBaseStoreYourselfData = (
  data: ResponseBaseStoreYourself['data'] | ResponseBaseStoreDataId,
  id: number | null,
): data is ResponseBaseStoreYourself['data'] => {
  return id === data.id
}

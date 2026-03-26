import { isObject } from '../../../../../standardized/utils/validators'
import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { Data } from '../../interfaces'

const dataParser = (data: unknown): Data => {
  if (!isObject(data)) throw new Error('Request returned an invalid data!')

  const parsed: Data = {
    id: numberOrDefault(data.id),
    modifier: {
      ...(isObject(data.modifier)
        ? {
            ...(data.modifier.id
              ? { id: numberOrDefault(data.modifier.id) }
              : {}),
            name: notEmptyStringOrDefault(data.modifier.name),
          }
        : {
            name: null,
          }),

      at: dateOrDefault(data.modified_at, null, 'YYYY-MM-DD HH:mm:ss'),
    },
  }

  return parsed
}

export default dataParser

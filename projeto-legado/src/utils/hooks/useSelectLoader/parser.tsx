import { notEmptyStringOrDefault, numberOrDefault } from '../../Formatters'
import { isObject } from '../../Validators'

import { ParserFunction } from './interfaces'

const parser: ParserFunction = (data) => {
  const parsed = data
    .filter((e) => isObject(e))
    .map((e) => {
      const value = numberOrDefault(e.id, '-').toString()
      const label = notEmptyStringOrDefault(e.name, '-')

      return {
        label,
        value,
        data: {},
      }
    })

  return parsed
}

export default parser

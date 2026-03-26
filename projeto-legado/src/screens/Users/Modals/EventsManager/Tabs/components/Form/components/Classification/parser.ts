import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../../utils/Validators'
import { Classification } from '../../interfaces'

export const classificationsParser = (data: unknown[]): Classification[] => {
  const parsed = data.reduce<Classification[]>((acc, item) => {
    if (!isObject(item)) return acc

    const id = numberOrDefault(item.id)
    if (!id) return acc

    const parser: Classification = {
      id,
      name: notEmptyStringOrDefault(item.name, ''),
      require_file: booleanOrDefault(item.required_file, false),
    }

    return [...acc, parser]
  }, [])

  return parsed
}

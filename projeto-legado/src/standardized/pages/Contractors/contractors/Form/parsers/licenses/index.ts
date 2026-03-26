import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { Licenses } from '../../types'

const parseLicenses = (licenses: unknown[]): Licenses => {
  return licenses.reduce<Licenses>((licenses, license) => {
    if (!isObject(license)) return licenses

    const id = numberOrDefault(license.type)
    if (!id) return licenses

    return [
      ...licenses,
      {
        id,
        name: notEmptyStringOrDefault(license.type_text, '-'),
        available: numberOrDefault(license.available, 0),
        consumed: 0, // numberOrDefault(license.consumed, 0),
        reserved: 0,
      },
    ]
  }, [])
}

export default parseLicenses

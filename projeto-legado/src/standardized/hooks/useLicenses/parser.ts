import { numberOrDefault } from '../../../utils/Formatters'
import { isObject } from '../../utils/validators'

import { Licenses } from './interfaces'

const parserLicenses = (data: unknown[]): Licenses => {
  const parser = data.reduce<Licenses>((licenses, e) => {
    if (!isObject(e) || !Array.isArray(e.contractor_license_hierarchies)) {
      return licenses
    }

    const type = numberOrDefault(e.type)
    if (!type) return licenses

    return {
      ...licenses,
      [type]: e.contractor_license_hierarchies.reduce<Licenses[number]>(
        (licenses, e) => {
          if (!isObject(e)) return licenses
          const hierarchy_id = numberOrDefault(e.hierarchy_id)
          if (!hierarchy_id) return licenses

          const prev = licenses[hierarchy_id] || {
            consumed: 0,
          }

          return {
            ...licenses,
            [hierarchy_id]: {
              consumed: numberOrDefault(e.consumed, 0) + prev.consumed,
              reserved: numberOrDefault(e.reserved, 0),
            },
          } as Licenses[number]
        },
        licenses[type] || {},
      ),
    }
  }, {})

  return parser
}

export default parserLicenses

import { Hierarchies, Licenses, Values } from '../../types'

const parseValues = (hierarchies: Hierarchies, licenses: Licenses): Values => {
  return hierarchies.reduce<Values>((values, hierarchy) => {
    return {
      ...values,
      ...licenses.reduce<Values>((values, license) => {
        const id = `${hierarchy.id}|${license.id}` as keyof Values
        return {
          ...values,
          [id]: {
            hierarchy_id: hierarchy.id,
            license_id: license.id,
            value: 0,
            min: 0,
          },
        } as Values
      }, {}),
    }
  }, {})
}

export default parseValues

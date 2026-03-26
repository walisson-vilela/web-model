import { isNumber } from 'lodash'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  setCategories: Function,
): BodyInterface[] => {
  const categories = []

  const parsed = data.map((e) => {
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      name: notEmptyStringOrDefault(e.name),
      included_jsx: null,
    }

    if (
      isNumber(item.id) &&
      Array.isArray(e.distribution_center_categories) &&
      e.distribution_center_categories.length > 0
    ) {
      categories.push(item.id)
    }

    return item
  })

  setCategories(categories)

  return parsed
}

export default parser

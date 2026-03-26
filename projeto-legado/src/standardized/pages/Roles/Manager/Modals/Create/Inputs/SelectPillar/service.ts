import axios from '../../../../../../../../services/Axios'
import { numberOrDefault } from '../../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../../utils/formatters'
import { isObject } from '../../../../../../../utils/validators'
import { Form } from '../../interfaces'

export type IHierarchies = Form['hierarchies'][number]

const parseHierarchies = (data: unknown[]): IHierarchies[] => {
  const parser = data.reduce<IHierarchies[]>((parsed, item) => {
    if (!isObject(item)) {
      return parsed
    }
    const hierarchy_id = numberOrDefault(item.id)
    if (!hierarchy_id) {
      throw new Error('Error fetching hierarchies')
    }

    const hierarchy: IHierarchies = {
      hierarchy_id,
      hierarchy_structure_id: null,
      name: notEmptyStringOrDefault(item.name),
    }
    return [...parsed, hierarchy]
  }, [] as IHierarchies[])
  return parser
}

export const getHierarchies = async (): Promise<IHierarchies[]> => {
  const { data: response } = await axios.get(
    '/v1/tr/hierarchies/options?sort=id',
  )

  if (!isObject(response)) {
    throw new Error('Error fetching hierarchies')
  }

  if (!Array.isArray(response.data)) {
    throw new Error('Error fetching hierarchies')
  }

  return parseHierarchies(response.data)
}

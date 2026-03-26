import axios from '../../services/Axios'
import { notEmptyStringOrDefault } from '../../standardized/utils/formatters'
import { numberOrDefault } from '../../utils/Formatters'
import { isObject } from '../../utils/Validators'

import { TabsProps } from './interfaces'

const parser = (data: unknown[]): TabsProps[] => {
  return data.reduce<TabsProps[]>((parsed, data) => {
    if (!isObject(data)) return parsed

    const hierarchy_id = numberOrDefault(data.id)
    if (!hierarchy_id) return parsed

    const item: TabsProps = {
      hierarchy_id,
      label: notEmptyStringOrDefault(data.name),
    }

    return [...parsed, item]
  }, [])
}

export const getHierarchies = async (): Promise<TabsProps[]> => {
  const { data } = await axios.get('/v1/tr/hierarchies/options', {
    params: {
      by_person: '',
      sort: 'id',
    },
  })

  if (!Array.isArray(data.data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return parser(data.data)
}

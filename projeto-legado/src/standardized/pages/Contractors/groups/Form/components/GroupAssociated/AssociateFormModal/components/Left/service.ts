import axios from '../../../../../../../../../../services/Axios/instance'
import { isObject } from '../../../../../../../../../../standardized/utils/validators'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../../utils/Formatters'
import { AssociatedGroup } from '../../../../../types'

const parseAssociatedGroup = (data: unknown[]): AssociatedGroup[] => {
  return data.reduce<AssociatedGroup[]>(
    (associatedGroup, nextAssociatedGroup): AssociatedGroup[] => {
      if (!isObject(nextAssociatedGroup)) return associatedGroup

      const id = numberOrDefault(nextAssociatedGroup.id)
      if (!id) return associatedGroup

      const checkAssociatedGroup: AssociatedGroup = {
        subcontractor_id: id,
        name: notEmptyStringOrDefault(nextAssociatedGroup.nickname, ''),
        type_text: notEmptyStringOrDefault(nextAssociatedGroup.type_label),
        avatar: isObject(nextAssociatedGroup.avatar)
          ? {
              url: notEmptyStringOrDefault(nextAssociatedGroup.avatar.url, ''),
            }
          : null,
      }
      return [...associatedGroup, checkAssociatedGroup]
    },
    [],
  )
}

export const getAssociatedGroup = async (
  search: string,
): Promise<AssociatedGroup[]> => {
  const params = {
    ...(search ? { q: search } : {}),
  }

  const { data: response } = await axios.get(
    'v1/tr/contractors/options?shared=1',
    {
      params,
    },
  )
  if (!isObject(response)) throw new Error('invalid response')
  if (!response.success) throw new Error('invalid response')
  if (!Array.isArray(response.data)) throw new Error('invalid response')

  return parseAssociatedGroup(response.data)
}

import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import { isObject } from '../../../../../../utils/validators'
import { HierarchyUser } from '../../../../types'

export const parserMirroring = (data: unknown[]) => {
  const parser = data.reduce<HierarchyUser[]>((acc, item) => {
    if (
      !isObject(item) ||
      !isObject(item.user) ||
      !isObject(item.user.role) ||
      !isObject(item.user.person)
    ) {
      return acc
    }

    const id = numberOrDefault(item.id)
    if (!id) return acc

    const data: HierarchyUser = {
      id: id,
      user: {
        id: numberOrDefault(item.user.id),
        name: notEmptyStringOrDefault(item.user.name),
        role: {
          id: numberOrDefault(item.user.role.id),
          name: notEmptyStringOrDefault(item.user.role.name),
        },
        avatar: null,
        person: {
          registration: notEmptyStringOrDefault(item.user.person.registration),
        },
      },
    }

    if (isObject(item.user.avatar)) {
      const url = notEmptyStringOrDefault(item.user.avatar.url)
      if (url) {
        data.user.avatar = {
          url,
          name: item.user.avatar.name,
        }
      }
    }

    return [...acc, data]
  }, [] as HierarchyUser[])

  return parser
}

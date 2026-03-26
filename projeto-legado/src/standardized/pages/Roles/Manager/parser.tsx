import { GenericObject } from '@mw-kit/mw-ui/types'

import Bullet from '../../../../components/Bullet'
import { booleanOrDefault, numberOrDefault } from '../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../utils/formatters'
import { formatPercent } from '../../../utils/formatters/numbers'
import { isObject } from '../../../utils/validators'

import { Form } from './Modals/Create/interfaces'
import { BodyInterface, Hierarchies } from './interfaces'

const parser = (data: unknown[]): BodyInterface[] => {
  const response = data.reduce<BodyInterface[]>((parsed, item) => {
    if (!isObject(item)) return parsed
    const id = numberOrDefault(item.id)

    if (!id) return parsed

    const category: BodyInterface = {
      id,
      name: notEmptyStringOrDefault(item.name),
      status: notEmptyStringOrDefault(item.status),
      status_label: (
        <Bullet
          color={item.status === 'A' ? 'lightGreen' : 'red'}
          content={item.status_label}
        />
      ),
      default_label: notEmptyStringOrDefault(item.default_label),
      default: booleanOrDefault(item.default),
      master: booleanOrDefault(item.master),
      access_level_label: notEmptyStringOrDefault(item.access_level_label),
      access_level_id: numberOrDefault(item.access_level_id, -1),
      internal_access_label: notEmptyStringOrDefault(
        item.internal_access_label,
      ),
      internal_access: booleanOrDefault(item.internal_access),
      user_percentage: null,
      user_count: numberOrDefault(item.user_count),
      menus: (Array.isArray(item.roles_menus) ? item.roles_menus : []).reduce<
        number[]
      >((ids, e) => {
        if (!isObject(e)) return ids
        const id = numberOrDefault(e.menu_id)
        return id ? [...ids, id] : ids
      }, []),

      hierarchies: [],
    }

    const percentage = numberOrDefault(item.user_percentage)

    if (percentage) {
      category.user_percentage = formatPercent(percentage)
    }

    if (Array.isArray(item.roles_hierarchies)) {
      const hierarchies = item.roles_hierarchies.reduce<Hierarchies[]>(
        (parsed, item) => {
          if (!isObject(item) || !isObject(item.hierarchy)) return parsed

          const hierarchy: Hierarchies = {
            ...(item.id && { id: numberOrDefault(item.id) }),
            hierarchy_id: numberOrDefault(item.hierarchy_id),
            name: notEmptyStringOrDefault(item.hierarchy.name),
            hierarchy_structure_id: numberOrDefault(
              item.hierarchy_structure_id,
            ),
          }
          return [...parsed, hierarchy]
        },
        [] as Hierarchies[],
      )

      category.hierarchies = hierarchies
    }

    return [...parsed, category]
  }, [] as BodyInterface[])

  return response
}

export default parser

const parserForm = (data: GenericObject): Form => {
  const form: Form = {
    id: numberOrDefault(data.id),
    user_count: numberOrDefault(data.user_count),
    name: notEmptyStringOrDefault(data.name),
    access_level_id: numberOrDefault(data.access_level_id),
    internal_access: booleanOrDefault(data.internal_access),
    hierarchies: [],
  }

  if (Array.isArray(data.hierarchies)) {
    const hierarchies = data.hierarchies.reduce<Hierarchies[]>(
      (parsed, item) => {
        if (!isObject(item)) return parsed

        const hierarchy: Hierarchies = {
          ...(item.id && { id: numberOrDefault(item.id) }),
          hierarchy_id: numberOrDefault(item.hierarchy_id),
          name: notEmptyStringOrDefault(item.name),
          hierarchy_structure_id: numberOrDefault(item.hierarchy_structure_id),
        }
        return [...parsed, hierarchy]
      },
      [] as Hierarchies[],
    )

    form.hierarchies = hierarchies
  }

  return form
}

export const formParser = (data: GenericObject | null): Form => {
  const parsed: Form = {
    id: null,
    user_count: 0,
    name: '',
    access_level_id: null,
    internal_access: false,
    hierarchies: [],
  }
  if (data === null) {
    return parsed
  }

  return parserForm(parsed)
}

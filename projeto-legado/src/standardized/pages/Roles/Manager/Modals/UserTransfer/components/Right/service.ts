import axios from '../../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/Validators'
import { notEmptyStringOrDefault } from '../../../../../../../utils/formatters'
import { Hierarchies } from '../../../../interfaces'
import { Role } from '../../interfaces'

const parseRoles = (data: unknown[], role_id: number): Role[] => {
  const parserRole = data.reduce<Role[]>((acc, role) => {
    if (!isObject(role)) return acc
    const id = numberOrDefault(role.id)
    if (!id || id === role_id) return acc

    const parser: Role = {
      id,
      name: notEmptyStringOrDefault(role.name),
      internal_access: booleanOrDefault(role.internal_access),
      internal_access_label: notEmptyStringOrDefault(
        role.internal_access_label,
      ),
      access_level_id: numberOrDefault(role.access_level_id, -1),
      access_level_label: notEmptyStringOrDefault(role.access_level_label),
      hierarchies: [],
    }
    if (Array.isArray(role.roles_hierarchies)) {
      parser.hierarchies = role.roles_hierarchies.map((hierarchy) => {
        return {
          id: numberOrDefault(hierarchy.hierarchy.id),
          hierarchy_id: numberOrDefault(hierarchy.hierarchy_id),
          name: notEmptyStringOrDefault(hierarchy.hierarchy.name),
          hierarchy_structure_id: numberOrDefault(
            hierarchy.hierarchy_structure_id,
          ),
        }
      })
    }

    return [...acc, parser]
  }, [])

  return parserRole
}

export const getRoles = async (
  search: string,
  id: number,
  hierarchies: Hierarchies[],
  internal_access: boolean,
  page: number,
): Promise<{ data: Role[]; pagination: { has_next_page: boolean } }> => {
  const params = {
    ...(search
      ? {
          q: search,
        }
      : {}),

    page,

    contain: 'RolesHierarchies',

    ...(internal_access
      ? { internal_access: 1 }
      : {
          strict_hierarchies: hierarchies
            .map((hierarchy) => {
              return hierarchy.hierarchy_id
            })
            .join(','),
        }),

    not_master: '',
  }

  const { data: response } = await axios.get('/v1/tr/roles', { params })

  return {
    data: parseRoles(response.data, id),
    pagination: {
      has_next_page: false,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}

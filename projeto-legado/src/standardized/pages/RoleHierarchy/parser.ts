import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import { getRoleStatus } from './functions'
import {
  Hierarchy,
  Level,
  Role,
  Role_Hierarchie,
  Schedule,
  StructureItem,
} from './types'

export const parserHierarchy = (data: unknown[]): Hierarchy[] => {
  const parser = data.reduce<Hierarchy[]>((acc, item) => {
    if (!isObject(item)) return acc

    const hierarchy: Hierarchy = {
      id: numberOrDefault(item.id),
      name: notEmptyStringOrDefault(item.name),
      hierarchy_type_id: numberOrDefault(item.hierarchy_type_id),
      manual_elements: booleanOrDefault(item.manual_elements, false),
    }
    return [...acc, hierarchy]
  }, [] as Hierarchy[])

  return parser
}

export const parserRole = (data: unknown[], hierarchy_id?: number): Role[] => {
  const parser = data.reduce<Role[]>((acc, item) => {
    if (!isObject(item)) return acc
    const role: Role = {
      id: numberOrDefault(item.id),
      name: notEmptyStringOrDefault(item.name),
      access_level_id: numberOrDefault(item.access_level_id),
      access_level_label: notEmptyStringOrDefault(item.access_level_label, ''),
      internal_access: booleanOrDefault(item.internal_access, false),
      internal_access_label: notEmptyStringOrDefault(
        item.internal_access_label,
        '',
      ),
      ...(item.status !== undefined && hierarchy_id
        ? { status: getRoleStatus(item, hierarchy_id) }
        : {}),
    }

    return [...acc, role]
  }, [] as Role[])
  return parser
}

export const parserLevels = (data: unknown[]): Level[] => {
  const parser = data.reduce<Level[]>((acc, item) => {
    if (!isObject(item)) return acc

    if (!Array.isArray(item.roles_hierarchies)) return acc

    const level: Level = {
      name: notEmptyStringOrDefault(item.name),
      roles: item.roles_hierarchies.reduce<Role[]>((acc, item) => {
        if (!isObject(item)) return acc

        const role: Role = {
          id: numberOrDefault(item.role.id),
          name: notEmptyStringOrDefault(item.role.name),
          access_level_id: numberOrDefault(item.role.access_level_id),
          access_level_label: notEmptyStringOrDefault(
            item.role.access_level_label,
            '',
          ),
          internal_access: booleanOrDefault(item.role.internal_access, false),
          internal_access_label: notEmptyStringOrDefault(
            item.role.internal_access_label,
            '',
          ),
        }

        return [...acc, role]
      }, [] as Role[]),
    }
    return [...acc, level]
  }, [] as Level[])
  return parser
}

export const parserSchedule = (
  data: unknown,
  hierarchy_id: number,
): Schedule | null => {
  if (!isObject(data)) return null
  if (!Array.isArray(data.structure)) return null

  const schedule: Schedule = {
    id: numberOrDefault(data.id),
    invalidated_at: notEmptyStringOrDefault(data.invalidated_at, null),
    manual_elements: booleanOrDefault(data.manual_elements, false),
    manual_elements_label: notEmptyStringOrDefault(
      data.manual_elements_label,
      '',
    ),
    modified_by: numberOrDefault(data.modified_by),
    modifier: {
      name: notEmptyStringOrDefault(data.modifier.name, ''),
    },
    schedule: notEmptyStringOrDefault(data.schedule, ''),
    structure: data.structure.reduce<StructureItem[]>((acc, item) => {
      if (!isObject(item)) return acc
      if (!Array.isArray(item.roles_hierarchies)) return acc

      const structureItem: StructureItem = {
        id: numberOrDefault(item.id),
        level: numberOrDefault(item.level),
        level_label: notEmptyStringOrDefault(item.level_label, ''),
        name: notEmptyStringOrDefault(item.name, ''),
        parent_id: numberOrDefault(item.parent_id, null),
        roles_hierarchies: item.roles_hierarchies.reduce<Role_Hierarchie[]>(
          (acc, item) => {
            if (!isObject(item)) return acc

            const role_hierarchy: Role_Hierarchie = {
              hierarchy_id: numberOrDefault(item.hierarchy_id),
              hierarchy__structure_id: numberOrDefault(
                item.hierarchy__structure_id,
              ),
              role: parserRole([item.role], hierarchy_id)[0],
            }
            return [...acc, role_hierarchy]
          },
          [] as Role_Hierarchie[],
        ),
      }
      return [...acc, structureItem]
    }, [] as StructureItem[]),
  }
  return schedule
}

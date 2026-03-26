import React from 'react'

import { isArray } from 'lodash'

import Bullet from '../../../components/Bullet'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    return {
      id: numberOrDefault(e.id),
      active: booleanOrDefault(e.status === 'A'),
      active_jsx: (
        <Bullet content={e.status_label} color={statusLabels[e.status].color} />
      ),
      name: notEmptyStringOrDefault(e.name),
      type: notEmptyStringOrDefault(e.default_label),
      access_level: notEmptyStringOrDefault(e.access_level_label),
      access_level_id: numberOrDefault(e.access_level_id),
      internal_attributes: notEmptyStringOrDefault(e.internal_access_label),
      internal_attributes_bool: booleanOrDefault(e.internal_access),
      representativeness: e.people_percentage
        ? notEmptyStringOrDefault(
            e.people_percentage.toString().replaceAll('.', ',') + '%',
          )
        : '-',
      user_count: numberOrDefault(e.people_count),
      hierarchies_ids: e.roles_hierarchies
        ? e.roles_hierarchies.map((e) => e.hierarchy_id)
        : [],
      hierarchy_structure_role_count: numberOrDefault(
        e.hierarchy_structure_role_count,
      ),
      homepage: notEmptyStringOrDefault(e.homepage),
      isMaster: booleanOrDefault(e.master),
      roles_menus: isArray(e.roles_menus)
        ? e.roles_menus.map((role) => role.menu_id)
        : [],
    }
  })
}

export default parser

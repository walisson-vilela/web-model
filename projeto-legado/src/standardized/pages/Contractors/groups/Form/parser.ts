import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import { AssociatedUser } from '../../components/ResponsibleTeam/types'
import { TYPE_GROUP } from '../../constants'

import { AssociatedGroup, Data, Form } from './types'

export const requestParser = (
  data: unknown = null,
  initialValues: Partial<Data> = {},
): Data => {
  const parsed: Data = {
    id: null,
    type: '',
    active: 1,

    name: null,
    allocated_users: 0,
    contractors_subcontractors: [],
    contractor_peoples: [],

    ...initialValues,

    modifier: null,
  }

  if (!isObject(data)) return parsed

  parsed.id = numberOrDefault(data.id)
  parsed.active = numberOrDefault(data.status, parsed.active)
  parsed.name = notEmptyStringOrDefault(data.nickname, parsed.name)
  parsed.allocated_users = numberOrDefault(data.user_allocation)

  if (Array.isArray(data.contractors_users)) {
    parsed.contractor_peoples = data.contractors_users.reduce<
      Data['contractor_peoples']
    >((contractor_peoples, e) => {
      if (!isObject(e) || !isObject(e.user)) return contractor_peoples

      const id = numberOrDefault(e.id)
      const person_id = numberOrDefault(e.user.id)
      if (!id || !person_id) return contractor_peoples

      const parsed: Data['contractor_peoples'][number] = {
        id,
        person_id,
        name: notEmptyStringOrDefault(e.user.name),
        role: isObject(e.user.role)
          ? {
              id: numberOrDefault(e.user.role.id),
              name: notEmptyStringOrDefault(e.user.role.name),
              master: booleanOrDefault(e.user.role.master, false),
            }
          : null,
        administrator: booleanOrDefault(e.administrator, false),
        menu_ids: (Array.isArray(e.users_menus) ? e.users_menus : []).reduce<
          number[]
        >((menu_ids, e) => {
          if (!isObject(e)) return menu_ids

          const menu_id = numberOrDefault(e.menu_id)

          if (menu_id === null) return menu_ids

          return [...menu_ids, menu_id]
        }, []),
      }

      return [...contractor_peoples, parsed]
    }, [])
  }

  if (Array.isArray(data.contractors_subcontractors)) {
    parsed.contractors_subcontractors = data.contractors_subcontractors.reduce<
      Data['contractors_subcontractors']
    >((contractors_subcontractors, e) => {
      if (!isObject(e) || !isObject(e.subcontractor)) {
        return contractors_subcontractors
      }

      const id = numberOrDefault(e.id)
      const subcontractor_id = numberOrDefault(e.subcontractor.id)
      if (!id || !subcontractor_id) return contractors_subcontractors

      const parsed: Data['contractors_subcontractors'][number] = {
        id,
        subcontractor_id: subcontractor_id,
        name: notEmptyStringOrDefault(e.subcontractor.nickname),
        type_text: notEmptyStringOrDefault(e.subcontractor.type_label),
        avatar: isObject(e.subcontractor.avatar)
          ? { url: notEmptyStringOrDefault(e.subcontractor.avatar.url) }
          : null,
      }

      return [...contractors_subcontractors, parsed]
    }, [])
  }

  parsed.modifier = {
    ...(isObject(data.modifier)
      ? {
          ...(data.modifier.id
            ? { id: numberOrDefault(data.modifier.id) }
            : {}),
          name: notEmptyStringOrDefault(data.modifier.name),
        }
      : {
          name: null,
        }),

    at: dateOrDefault(data.modified_at, null, 'YYYY-MM-DD HH:mm:ss'),
  }

  return parsed
}

export const formParser = (data: Data | null = null): Form => {
  const parsed: Form = {
    // status
    active: 1,
    type: '',

    // basic data
    name: '',
    allocated_users: 0,
    group_associated: [],
    associated_users: [],
  }

  if (data === null) return parsed

  parsed.name = notEmptyStringOrDefault(data.name, parsed.name)
  parsed.active = data.active > 0 ? 1 : 0
  parsed.type = notEmptyStringOrDefault(data.type, '')
  parsed.associated_users = data.contractor_peoples
  parsed.group_associated = data.contractors_subcontractors
  parsed.allocated_users = data.allocated_users

  return parsed
}

export const saveParser = async (formData: Form) => {
  const validContractorPeoples = (associated_users: AssociatedUser[]) => {
    if (associated_users.length > 0) {
      return formData.associated_users.map((associated_user) => {
        return {
          ...(associated_user.id ? { id: associated_user.id } : {}),
          user_id: associated_user.person_id,
          administrator: associated_user.administrator ? 1 : 0,
          users_menus: associated_user.menu_ids.map((menu_id) => ({ menu_id })),
        }
      })
    }
    return '' as const
  }

  const validSubContractors = (group_associated: AssociatedGroup[]) => {
    if (group_associated.length > 0) {
      return group_associated.map((contractor) => {
        return {
          ...(contractor.id ? { id: contractor.id } : {}),
          subcontractor_id: contractor.subcontractor_id,
        }
      })
    }
    return '' as const
  }

  const payload = {
    status: numberOrDefault(formData.active),

    nickname: notEmptyStringOrDefault(formData.name),
    user_allocation: numberOrDefault(formData.allocated_users),
    type: TYPE_GROUP,

    contractors_users: validContractorPeoples(formData.associated_users),

    contractors_subcontractors: validSubContractors(formData.group_associated),
  }

  return payload
}

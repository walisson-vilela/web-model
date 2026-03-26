import { GenericObject } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import {
  booleanOrDefault,
  dateOrDefault,
  keys,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isOneOf } from '../../../../utils/Validators'
import { isObject } from '../../../utils/validators'
import { workShiftParser } from '../../WorkShifts/services/list/parser'
import { PERSON_STATUS, TRAVEL_MODE } from '../labels'

import { Data, Form, Role } from './interfaces'

const getStatus = (user: unknown): keyof typeof PERSON_STATUS => {
  if (!isObject(user)) return PERSON_STATUS.PC.value

  if (user.deleted_at) return PERSON_STATUS.P.value

  if (user.active) return PERSON_STATUS.A.value

  if (isObject(user.event_user) && isObject(user.event_user.event)) {
    if (user.event_user.event.type === 'ACTIVATION') {
      return PERSON_STATUS.AP.value
    }
  }

  return PERSON_STATUS.T.value
}

export const dataParser = (data: GenericObject): Data => {
  const id = numberOrDefault(data.id)
  if (!id) throw new Error('Could not get user id')

  const parsed: Data = {
    id,

    name: notEmptyStringOrDefault(data.name, ''),

    document: notEmptyStringOrDefault(data.document_masked, ''),
    registration: notEmptyStringOrDefault(data.registration),

    event_count: 0,
    event_user: null,
    modifier: null,
    pis: null,
  }

  parsed.pis = notEmptyStringOrDefault(data.pis, parsed.pis)

  if (!isObject(data.user)) return parsed
  parsed.event_count = numberOrDefault(
    data.user.event_count,
    parsed.event_count,
  )

  parsed.modifier = {
    ...(isObject(data.user.modifier)
      ? {
          ...(() => {
            const id = numberOrDefault(data.user.modifier.id)
            return id ? { id } : {}
          })(),
          name: notEmptyStringOrDefault(data.user.modifier.name),
        }
      : {
          name: null,
        }),

    at: dateOrDefault(data.user.modified_at, null, 'YYYY-MM-DD HH:mm:ss'),
  }

  if (isObject(data.user.event_user)) {
    const id = numberOrDefault(data.user.event_user.event.id)
    const starts_at = dateOrDefault(
      data.user.event_user.event.starts_at,
      null,
      'YYYY-MM-DD HH:mm:ss',
    )

    if (id && starts_at) {
      parsed.event_user = {
        event: {
          id,
          type: notEmptyStringOrDefault(data.user.event_user.event.type, ''),
          starts_at,
          ends_at: dateOrDefault(
            data.user.event_user.event.ends_at,
            null,
            'YYYY-MM-DD HH:mm:ss',
          ),

          name: notEmptyStringOrDefault(data.user.event_user.event.name, ''),
          classification: isObject(data.user.event_user.event.classification)
            ? {
                name: notEmptyStringOrDefault(
                  data.user.event_user.event.classification.name,
                  '',
                ),
              }
            : null,
        },
        creator: {
          name: isObject(data.user.event_user.creator)
            ? notEmptyStringOrDefault(data.user.event_user.creator.name, '')
            : '',
        },
      }
    }
  }

  return parsed
}

export const roleParser = (data: unknown): Form['role'] => {
  if (!isObject(data)) return null

  const id = numberOrDefault(data.id)
  const internal_access = booleanOrDefault(data.internal_access)
  if (id === null || internal_access === null) return null

  return {
    id,
    name: notEmptyStringOrDefault(data.name, ''),
    internal_access,
    access_level_id: numberOrDefault(data.access_level_id, -1),
    access_level_label: notEmptyStringOrDefault(data.access_level_label, ''),
    hierarchies: (Array.isArray(data.roles_hierarchies)
      ? data.roles_hierarchies
      : []
    ).reduce<Role['hierarchies']>((h, e) => {
      if (!isObject(e) || !isObject(e.hierarchy)) return h
      const id = numberOrDefault<number | null>(e.hierarchy.id)
      if (!id) return h
      return [
        ...h,
        {
          id,
          name: notEmptyStringOrDefault(e.hierarchy.name, ''),
        },
      ]
    }, []),
    licenses: 0,
  }
}

export const superiorParser = (
  e: unknown,
): Form['hierarchies'][number]['superior'] => {
  if (!isObject(e)) return null

  const id = numberOrDefault(e.id)
  if (!id) return null

  return {
    id,
    name: notEmptyStringOrDefault(e.name, ''),
    role: isObject(e.role)
      ? {
          id: numberOrDefault(e.role.id),
          name: notEmptyStringOrDefault(e.role.name, ''),
        }
      : {
          id: 0,
          name: '',
        },
  }
}

export const formParser = (data: GenericObject | null): Form => {
  const parsed: Form = {
    status: PERSON_STATUS.PC.value,

    replace: null,
    role: null,
    password: '',
    hierarchies: [],
    route_contractor: null,
    personal_mobile: false,
    imei: null,
    travel_mode: null,
    less_walking: 0,
    host_city: null,
    electronic_point: false,
    work_shift: null,
  }

  if (!isObject(data)) return parsed

  if (!isObject(data.user)) return parsed

  const host_city = data.user.host_city

  if (isObject(host_city)) {
    parsed.host_city = {
      id: numberOrDefault(host_city.id, 0),
      name: notEmptyStringOrDefault(host_city.name, ''),

      state: isObject(host_city.state)
        ? {
            id: numberOrDefault(host_city.state.id, 0),
            name: notEmptyStringOrDefault(host_city.state.name, ''),
          }
        : {
            id: 0,
            name: '',
          },

      country: isObject(host_city.country)
        ? {
            id: numberOrDefault(host_city.country.id, 0),
            name: notEmptyStringOrDefault(host_city.country.name, ''),
          }
        : {
            id: 0,
            name: '',
          },
    }
  }

  parsed.status = getStatus(data.user)

  const role = (parsed.role = roleParser(data.user.role))

  if (role && !role.internal_access) {
    parsed.hierarchies = (
      Array.isArray(data.user.hierarchies_users)
        ? data.user.hierarchies_users
        : []
    )
      .reduce<Form['hierarchies']>((h, e) => {
        if (!isObject(e) || !isObject(e.hierarchy)) return h

        const id = notEmptyStringOrDefault(e.id)
        const hierarchy_id = numberOrDefault(e.hierarchy.id)
        if (
          !id ||
          !hierarchy_id ||
          !role.hierarchies.some((e) => e.id === hierarchy_id)
        ) {
          return h
        }

        return [
          ...h,
          {
            id,
            hierarchy_id,
            name: notEmptyStringOrDefault(e.hierarchy.name, ''),
            superior: superiorParser(e.superior),
            regions: (Array.isArray(e.regions_users)
              ? e.regions_users
              : []
            ).reduce<Form['hierarchies'][number]['regions']>((r, e) => {
              if (!isObject(e) || !isObject(e.region)) return r
              const id = numberOrDefault<number | null>(e.id)
              const region_id = numberOrDefault<number | null>(e.region.id)
              if (!id || !region_id) return r

              return [
                ...r,
                {
                  id,
                  region_id,
                  name: notEmptyStringOrDefault(e.region.name, ''),
                },
              ]
            }, []),
            manual: booleanOrDefault(e.manual, false),
            modified_at: dateOrDefault(
              e.modified_at,
              moment().format('YYYY-MM-DD HH:mm:ss'),
              'YYYY-MM-DD HH:mm:ss',
              'YYYY-MM-DD HH:mm:ss',
            ),
          },
        ]
      }, [])
      .sort((a, b) => a.hierarchy_id - b.hierarchy_id)
  }

  if (isObject(data.user.route_contractor)) {
    const id = numberOrDefault(data.user.route_contractor.id)
    if (id) {
      parsed.route_contractor = {
        id,
        nickname: notEmptyStringOrDefault(
          data.user.route_contractor.nickname,
          '',
        ),
      }
    }
  }

  parsed.personal_mobile = booleanOrDefault(
    data.user.personal_mobile,
    parsed.personal_mobile,
  )

  if (isObject(data.user.user_imei)) {
    parsed.imei = notEmptyStringOrDefault(
      data.user.user_imei.token,
      parsed.imei,
    )
  }

  const travel_mode = notEmptyStringOrDefault(
    data.user.travel_mode,
    parsed.travel_mode || '',
  )
  if (isOneOf(travel_mode, keys(TRAVEL_MODE))) {
    parsed.travel_mode = travel_mode
  }

  parsed.less_walking = numberOrDefault(
    data.user.less_walking,
    parsed.less_walking,
  )

  parsed.work_shift = workShiftParser(data.user.work_shift)
  if (parsed.work_shift) {
    parsed.electronic_point = parsed.work_shift.electronic_point
  }

  return parsed
}

export const saveParser = (
  form: Form,
  checkDirty: (field: keyof Form) => boolean,
  activation?: Date,
) => {
  const isDirty = (field: keyof Form | (keyof Form)[]) => {
    return (Array.isArray(field) ? field : [field]).some(checkDirty)
  }

  const payload = {
    ...(isDirty('replace') && form.replace && form.replace.user
      ? { replace: form.replace.user.id }
      : {}),

    ...(isDirty('password')
      ? { authentication: { password: form.password } }
      : {}),

    ...(isDirty(['role', 'hierarchies'])
      ? {
          role_id: form.role ? form.role.id : null,
          hierarchies_users: form.hierarchies.map((hierarchy) => {
            return {
              ...(hierarchy.id ? { id: hierarchy.id } : {}),
              hierarchy_id: hierarchy.hierarchy_id,
              superior_id: hierarchy.superior ? hierarchy.superior.id : null,
              regions_users: hierarchy.regions.map((region) => ({
                ...(region.id ? { id: region.id } : {}),
                region_id: region.region_id,
              })),
              manual: hierarchy.manual,
            }
          }),
        }
      : {}),

    ...(isDirty('route_contractor')
      ? {
          route_contractor_id: form.route_contractor
            ? form.route_contractor.id
            : null,
        }
      : {}),

    ...(isDirty('personal_mobile')
      ? { personal_mobile: form.personal_mobile }
      : {}),
    ...(isDirty('imei')
      ? { user_imei: form.imei ? { token: form.imei } : null }
      : {}),
    ...(isDirty(['travel_mode', 'less_walking'])
      ? { travel_mode: form.travel_mode, less_walking: form.less_walking }
      : {}),
    ...(isDirty('host_city')
      ? { host_city_id: form.host_city ? form.host_city.id : null }
      : {}),
    ...(activation
      ? { activation: moment(activation).format('YYYY-MM-DD HH:mm:ss') }
      : {}),
    ...(isDirty('work_shift')
      ? { work_shift_id: form.work_shift ? form.work_shift.id : null }
      : {}),
  }

  return payload
}

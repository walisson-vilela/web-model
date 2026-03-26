import { GenericObject } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { ContractorLicenses, Data, Hierarchies } from '../../types'
import parseValues from '../values'

const requestParser = (
  data: unknown = null,
  initialValues: Partial<Data> = {},
): Data => {
  const parsed: Data = {
    id: null,
    type: null,

    active: 1,

    avatar: null,

    can_group: null,
    grouped: null,
    document: null,
    cnpj: null,
    name: null,
    subdomain: null,

    postal_code: null,
    street_type: null,

    street_number: null,
    complement: null,
    district: null,
    locality: null,
    state_short: null,
    street: null,

    // geolocation
    lat: null,
    lng: null,
    radius: 50,

    geolocation_at: null,
    geolocation_by_user: {
      id: null,
      name: null,
    },

    modifier: null,

    allocated_users: 0,

    contractor_region_countries: [1],
    contractor_peoples: [],
    contractor_terms: [],
    contractors_forms: [],

    licenses: {
      hierarchies: [],
      licenses: [],
      values: {},
    },

    ppt_template: null,

    ...initialValues,
  }

  if (!isObject(data)) return parsed

  parsed.id = numberOrDefault(data.id, parsed.id)
  parsed.type = notEmptyStringOrDefault(data.type, parsed.type)
  parsed.active = booleanOrDefault(data.status, parsed.active) ? 1 : 0

  if (isObject(data.avatar)) {
    const avatar = {
      id: numberOrDefault(data.avatar.id),
      extension: notEmptyStringOrDefault(data.avatar.extension, ''),
      name: notEmptyStringOrDefault(data.avatar.name, ''),
      url: notEmptyStringOrDefault(data.avatar.url),
    }
    if (avatar.id !== null && avatar.url !== null) {
      parsed.avatar = avatar as Data['avatar']
    }
  }
  // TODO: tratar o avatar
  parsed.can_group = booleanOrDefault(data.shared, parsed.can_group)
  parsed.grouped = booleanOrDefault(data.grouped, parsed.grouped)
  parsed.document = notEmptyStringOrDefault(data.document, parsed.document)
  parsed.name = notEmptyStringOrDefault(data.nickname, parsed.name)
  parsed.subdomain = notEmptyStringOrDefault(data.subdomain, parsed.subdomain)
  if (isObject(data.address)) {
    parsed.postal_code = notEmptyStringOrDefault(
      data.address.postal_code,
      parsed.postal_code,
    )
    parsed.street_type = notEmptyStringOrDefault(
      data.address.street_type,
      parsed.street_type,
    )
    parsed.street = notEmptyStringOrDefault(
      data.address.street_name,
      parsed.street,
    )
    parsed.street_number = notEmptyStringOrDefault(
      data.address.street_number,
      parsed.street_number,
    )
    parsed.complement = notEmptyStringOrDefault(
      data.address.complement,
      parsed.complement,
    )
    parsed.district = notEmptyStringOrDefault(
      data.address.sublocality_name,
      parsed.district,
    )
    parsed.locality = notEmptyStringOrDefault(
      data.address.city_name,
      parsed.locality,
    )
    parsed.state_short = notEmptyStringOrDefault(
      data.address.state_code,
      parsed.state_short,
    )
  }

  if (isObject(data.coordinate)) {
    parsed.lat = numberOrDefault(data.coordinate.lat, parsed.lat)
    parsed.lng = numberOrDefault(data.coordinate.lng, parsed.lng)
    parsed.radius = numberOrDefault(data.coordinate.radius, parsed.radius)
    if (data.coordinate.modified_at) {
      const geolocation_at = moment(data.coordinate.modified_at)

      if (geolocation_at.isValid()) {
        parsed.geolocation_at = geolocation_at.format('YYYY-MM-DD HH:mm:ss')
      }
    }
    if (isObject(data.coordinate.modified_by_person)) {
      parsed.geolocation_by_user.id = numberOrDefault(
        data.coordinate.modified_by_person.id,
        parsed.geolocation_by_user.id,
      )
      parsed.geolocation_by_user.name = notEmptyStringOrDefault(
        data.modified_by_person.name,
        parsed.geolocation_by_user.name,
      )
    }
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

  parsed.allocated_users = numberOrDefault(
    data.user_allocation,
    parsed.allocated_users,
  )

  if (Array.isArray(data.contractors_countries)) {
    parsed.contractor_region_countries = data.contractors_countries.reduce<
      Data['contractor_region_countries']
    >((contractor_region_countries, e) => {
      const id = numberOrDefault(e.country_id)
      if (!id) return contractor_region_countries
      return [...contractor_region_countries, id]
    }, [])
  }

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

  if (Array.isArray(data.contractors_forms)) {
    parsed.contractors_forms = data.contractors_forms.reduce<
      Data['contractors_forms']
    >((contractors_forms, e) => {
      if (!isObject(e)) return contractors_forms

      const id = numberOrDefault(e.id)
      if (!id) return contractors_forms

      const parsed: Data['contractors_forms'][number] = {
        id,
        contractor_id: numberOrDefault(e.contractor_id),
        form_id: numberOrDefault(e.form_id),
        form: isObject(e.form)
          ? {
              id: numberOrDefault(e.form.id),
              name: notEmptyStringOrDefault(e.form.name),
            }
          : null,
      }

      return [...contractors_forms, parsed]
    }, [])
  }

  if (Array.isArray(data.contractor_terms)) {
    parsed.contractor_terms = data.contractor_terms.reduce<
      Data['contractor_terms']
    >((contractor_terms, e) => {
      if (!isObject(e)) return contractor_terms

      const id = numberOrDefault(e.id)
      if (!id) return contractor_terms

      const parsed: Data['contractor_terms'][number] = {
        id,
        contractor_id: numberOrDefault(e.contractor_id),
        type: numberOrDefault(e.type),
        title: notEmptyStringOrDefault(e.title),
        content: notEmptyStringOrDefault(e.content),
        modified_at: notEmptyStringOrDefault(e.modified_at),
      }

      return [...contractor_terms, parsed]
    }, [])
  }

  if (isObject(data.ppt_template)) {
    type PptTemplate = Exclude<Data['ppt_template'], null>
    parsed.ppt_template = {
      id: numberOrDefault(data.ppt_template.id),
      contents: (Array.isArray(data.ppt_template.contents)
        ? data.ppt_template.contents
        : []
      ).reduce<PptTemplate['contents']>((contents, e) => {
        if (!isObject(e)) return contents

        const id = numberOrDefault(e.id)
        if (!id) return contents

        const parsed: PptTemplate['contents'][number] = {
          id,
          template_id: numberOrDefault(e.template_id),
          page: notEmptyStringOrDefault(e.page),
          color: notEmptyStringOrDefault(e.color),
        }

        return [...contents, parsed]
      }, []),

      ...(['single_file', 'duo_file', 'cover_file'] as const).reduce(
        (files, k) => {
          if (!isObject(data.ppt_template[k])) return files

          const e: GenericObject = data.ppt_template[k]
          const url = notEmptyStringOrDefault(e.url)
          if (!url) return files

          const parsed: PptTemplate[typeof k] = {
            id: numberOrDefault(e.id),
            url,
            name: notEmptyStringOrDefault(e.name),
            extension: notEmptyStringOrDefault(e.extension),
          }

          return { ...files, [k]: parsed }
        },
        {} as Pick<PptTemplate, 'cover_file' | 'duo_file' | 'single_file'>,
      ),
    }
  }

  if (Array.isArray(data.hierarchies)) {
    parsed.licenses.hierarchies = data.hierarchies.reduce<Hierarchies>(
      (hierarchies, hierarchy) => {
        if (!isObject(hierarchy)) return hierarchies

        const id = numberOrDefault(hierarchy.id)
        if (!id) return hierarchies

        return [
          ...hierarchies,
          {
            id,
            name: notEmptyStringOrDefault(hierarchy.name, '-'),
          },
        ]
      },
      [],
    )
  }

  parsed.licenses.values = parseValues(
    parsed.licenses.hierarchies,
    parsed.licenses.licenses,
  )

  if (Array.isArray(data.licenses)) {
    data.licenses.forEach((e) => {
      if (!isObject(e)) return

      const license_id = numberOrDefault(e.type)
      if (!license_id) return

      const index = parsed.licenses.licenses.findIndex(
        (license) => license.id === license_id,
      )
      if (index < 0) return

      const consumed = numberOrDefault(e.consumed, 0)
      const reserved = numberOrDefault(e.reserved, 0)
      parsed.licenses.licenses[index].consumed = consumed
      parsed.licenses.licenses[index].reserved = reserved

      if (!Array.isArray(e.contractor_license_hierarchies)) return

      e.contractor_license_hierarchies.forEach((e) => {
        if (!isObject(e)) return

        const hierarchy_id = numberOrDefault(e.hierarchy_id)
        if (!hierarchy_id) return

        const id =
          `${hierarchy_id}|${license_id}` as keyof ContractorLicenses['values']
        if (!(id in parsed.licenses.values)) return

        const value = numberOrDefault(e.reserved, 0)
        const min = numberOrDefault(e.consumed, 0)

        parsed.licenses.values[id].value = value
        parsed.licenses.values[id].min = min
      })
    })
  }

  return parsed
}

export default requestParser

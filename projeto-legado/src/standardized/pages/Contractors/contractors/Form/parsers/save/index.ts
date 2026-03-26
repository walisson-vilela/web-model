import { GenericObject } from '@mw-kit/mw-ui/types'

import { getHTMLImageIds } from '../../../../../../../components/TextEditor/functions'
import { base64ToFile } from '../../../../../../../utils/FileFormatter'
import {
  keys,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { notEmptyString } from '../../../../../../../utils/Validators'
import { TYPE_MASTER, TYPE_SUBCONTRACTOR } from '../../../../constants'
import { Data, Form } from '../../types'

const saveParser = async (
  formData: Form,
  data: Data,
  dirtyFields: (keyof Form)[],
  originals: Form,
  isMaster: boolean,
) => {
  const isDirty =
    data && data.id
      ? (field: keyof Form) => dirtyFields.includes(field)
      : () => true
  const type =
    data && data.type ? data.type : isMaster ? TYPE_MASTER : TYPE_SUBCONTRACTOR

  const payload = {
    nickname: notEmptyStringOrDefault(formData.name),
    subdomain: notEmptyStringOrDefault(formData.subdomain.toLowerCase()),
    shared: formData.sharedModel ? 1 : 0,
    type,
    status: numberOrDefault(formData.active),
    document: notEmptyStringOrDefault(formData.document),
    ...((
      [
        'postal_code',
        'state',
        'city',
        'sublocality',
        'street_type',
        'street_number',
        'street_address',
        'complement',
      ] as const
    ).some(isDirty)
      ? {
          address: {
            postal_code: notEmptyStringOrDefault(formData.postal_code),
            state_code: notEmptyStringOrDefault(formData.state),
            city_name: notEmptyStringOrDefault(formData.city),
            sublocality_name: notEmptyStringOrDefault(formData.sublocality),
            street_type: notEmptyStringOrDefault(formData.street_type),
            street_number: numberOrDefault(formData.street_number),
            street_name: notEmptyStringOrDefault(formData.street_address),
            complement: notEmptyStringOrDefault(formData.complement),
            country_name: 'Brasil',
          },
        }
      : {}),
    ...((['lat', 'lng', 'radius'] as const).some(isDirty)
      ? {
          coordinate: {
            lat: numberOrDefault(formData.lat),
            lng: numberOrDefault(formData.lng),
            radius: numberOrDefault(formData.radius),
          },
        }
      : {}),
    user_allocation: formData.allocated_users,

    ...(isDirty('occupationArea')
      ? {
          contractors_countries: (() => {
            const contractors_countries = formData.occupationArea.map(
              (country_id) => ({ country_id }),
            )

            return contractors_countries.length > 0 ? contractors_countries : ''
          })(),
        }
      : {}),

    ...(isDirty('avatar')
      ? {
          avatar: notEmptyString(formData.avatar)
            ? {
                container: 'images',
                directory: 'avatars',
                file: await base64ToFile(formData.avatar, 'avatar.png'),
              }
            : '',
        }
      : {}),

    ...(isDirty('licenses') && 'licenses' in formData
      ? {
          licenses: (() => {
            const parsed = keys(formData.licenses.values).reduce(
              (contractor_licenses, id) => {
                const { hierarchy_id, license_id, value } =
                  formData.licenses.values[id]

                return {
                  ...contractor_licenses,
                  [license_id]: {
                    ...(contractor_licenses[license_id] || {}),
                    [hierarchy_id]: value,
                  },
                }
              },
              {} as { [key: number]: { [key: number]: number } },
            )

            const licenses = keys(parsed).map((license_id) => {
              return {
                type: parseFloat(license_id as unknown as string),
                contractor_license_hierarchies: keys(parsed[license_id]).map(
                  (hierarchy_id) => {
                    return {
                      reserved: parsed[license_id][hierarchy_id],
                      hierarchy_id: parseFloat(
                        hierarchy_id as unknown as string,
                      ),
                    }
                  },
                ),
              }
            })

            return licenses.length > 0 ? licenses : ''
          })(),
        }
      : {}),

    ...(isDirty('user_associated')
      ? {
          contractors_users: (() => {
            const contractor_peoples = formData.user_associated.map((e) => {
              return {
                ...(e.id ? { id: e.id } : {}),
                user_id: e.person_id,
                administrator: e.administrator ? 1 : 0,
                users_menus: e.menu_ids.map((menu_id) => ({ menu_id })),
              }
            })

            return contractor_peoples.length > 0 ? contractor_peoples : ''
          })(),
        }
      : {}),

    ...(isDirty('forms')
      ? {
          contractors_forms: (() => {
            const contractors_forms = formData.forms.map((e) => {
              return { form_id: e.id }
            })

            return contractors_forms.length > 0 ? contractors_forms : null
          })(),
        }
      : {}),

    ...(isDirty('ppt_templates')
      ? {
          ppt_template: (() => {
            const ppt_templates = keys(
              formData.ppt_templates,
            ).reduce<GenericObject>(
              (ppt_template, page) => {
                const { file, file_key, color, url } =
                  formData.ppt_templates[page]

                if (file) {
                  ppt_template[file_key] = { file }
                } else if (!url.includes('http')) {
                  ppt_template[file_key] = ''
                }

                ppt_template.contents.push({
                  page,
                  color,
                })

                return ppt_template
              },
              {
                ...(data && data.ppt_template && data.ppt_template.id
                  ? { id: data.ppt_template.id }
                  : {}),
                contents: [],
              },
            )

            return {
              ...ppt_templates,
              contents:
                ppt_templates.contents.length > 0 ? ppt_templates.contents : '',
            }
          })(),
        }
      : {}),

    ...(isDirty('termsOfUse') || isDirty('privacyPolicy')
      ? {
          contractor_terms: (() => {
            const original = [originals.termsOfUse, originals.privacyPolicy]

            const contractor_terms = [
              formData.termsOfUse,
              formData.privacyPolicy,
            ].reduce(
              (terms, term, type) => {
                return [
                  ...terms,
                  ...term.map((term) => {
                    const parsed = {
                      content: term.term.toString(),
                      content_images: getHTMLImageIds(term.term),
                      type,
                      title: term.title,
                    }

                    const id = numberOrDefault(term.id)
                    if (
                      id &&
                      original[type].some(
                        (e) => id === e.id && parsed.content === e.term,
                      )
                    ) {
                      return { id }
                    }

                    return parsed
                  }),
                ]
              },
              [] as (
                | {
                    content: string
                    content_images: number[]
                    type: number
                    title: string
                  }
                | { id: number }
              )[],
            )

            return contractor_terms.length < 1 ? '' : contractor_terms
          })(),
        }
      : {}),
  }

  return payload
}

export default saveParser

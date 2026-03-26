import {
  booleanOrDefault,
  cep as formatCEP,
  cnpj as formatCNPJ,
  keys,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import {
  isKeyOf,
  isObject,
  strCmp,
} from '../../../../../../../utils/Validators'
import { PPT_TEMPLATES } from '../../constants'
import { street_types } from '../../options'
import { Data, Form } from '../../types'

const formParser = (data: Data | null = null): Form => {
  const parsed: Form = {
    // status
    active: 1,

    avatar: '',

    // basic data
    document: '',
    /* cnpj: '', */
    name: '',
    subdomain: '',
    occupationArea: [],
    sharedModel: '',

    // address
    postal_code: '',
    street_type: '',
    street_address: '',
    street_number: '',
    complement: '',
    sublocality: '',
    city: '',
    state: '',

    // geolocation
    lat: '',
    lng: '',
    radius: 50,
    geolocation_at: '',
    geolocation_by_id: '',
    geolocation_by_name: '',

    allocated_users: 0,
    responsibleAccount: [],
    user_associated: [],
    termsOfUse: [],
    privacyPolicy: [],
    forms: [],
    licenses: {
      hierarchies: [],
      licenses: [],
      values: {},
    },
    ppt_templates: keys(PPT_TEMPLATES).reduce(
      (ppt_templates, key) => ({
        ...ppt_templates,
        [key]: { ...PPT_TEMPLATES[key] },
      }),
      {} as Form['ppt_templates'],
    ),
  }

  if (data === null) return parsed

  parsed.active = data.active > 0 ? 1 : 0
  parsed.avatar = notEmptyStringOrDefault(
    data && data.avatar && data.avatar.url ? data.avatar.url : '',
    '',
  )

  parsed.name = notEmptyStringOrDefault(data.name, '')
  parsed.subdomain = notEmptyStringOrDefault(data.subdomain, '')
  parsed.sharedModel = booleanOrDefault(data.can_group, '')

  parsed.document = formatCNPJ(notEmptyStringOrDefault(data.document, ''))
  parsed.postal_code = formatCEP(notEmptyStringOrDefault(data.postal_code, ''))

  parsed.street_type = notEmptyStringOrDefault(data.street_type, '')

  if (parsed.street_type !== '') {
    const street_type = street_types.find((e) =>
      strCmp(e.value, parsed.street_type),
    )
    parsed.street_type = street_type ? street_type.value : ''
  }

  parsed.street_address = notEmptyStringOrDefault(data.street, '')
  parsed.street_number = notEmptyStringOrDefault(data.street_number, '')
  parsed.complement = notEmptyStringOrDefault(data.complement, '')
  parsed.sublocality = notEmptyStringOrDefault(data.district, '')
  parsed.city = notEmptyStringOrDefault(data.locality, '')
  parsed.state = notEmptyStringOrDefault(data.state_short, '')

  parsed.lat = numberOrDefault(data.lat)
  parsed.lng = numberOrDefault(data.lng)
  parsed.radius = numberOrDefault(data.radius)

  parsed.geolocation_at = notEmptyStringOrDefault(data.geolocation_at)

  parsed.allocated_users = numberOrDefault(data.allocated_users)
  parsed.occupationArea = data.contractor_region_countries

  parsed.user_associated = data.contractor_peoples
  ;[parsed.termsOfUse, parsed.privacyPolicy] = data.contractor_terms.reduce(
    (terms, term) => {
      const index = numberOrDefault(term.type, -1)
      if (index in terms) {
        terms[index].push({
          id: numberOrDefault(term.id),
          title: notEmptyStringOrDefault(term.title, ''),
          term: notEmptyStringOrDefault(term.content, ''),
          updated: notEmptyStringOrDefault(term.modified_at),
        })
      }

      return [...terms]
    },
    [[], []] as [Form['termsOfUse'], Form['privacyPolicy']],
  )

  if (isObject(data.geolocation_by_user)) {
    parsed.geolocation_by_id = numberOrDefault(data.geolocation_by_user.id)
    parsed.geolocation_by_name = notEmptyStringOrDefault(
      data.geolocation_by_user.name,
      '',
    )
  }

  parsed.forms = data.contractors_forms.reduce((forms, e) => {
    if (!e.form || !e.form.id) return forms
    const parsed = {
      id: e.form.id,
      name: e.form.name || '',
      name_str: '',
    }
    parsed.name_str = [parsed.id, parsed.name].join(' - ')
    return [...forms, parsed]
  }, [] as Form['forms'])

  if (
    isObject(data.ppt_template) &&
    Array.isArray(data.ppt_template.contents)
  ) {
    const pptTemplate = data.ppt_template

    pptTemplate.contents.forEach((item) => {
      const type = notEmptyStringOrDefault(item.page, '')
      if (!isKeyOf(parsed.ppt_templates, type)) return

      parsed.ppt_templates[type].color = notEmptyStringOrDefault(
        item.color,
        parsed.ppt_templates[type].color,
      )

      const { file_key } = parsed.ppt_templates[type]

      if (isObject(pptTemplate[file_key])) {
        const name = notEmptyStringOrDefault(pptTemplate[file_key]?.name)
        if (name) parsed.ppt_templates[type].name = name

        const url = notEmptyStringOrDefault(pptTemplate[file_key]?.url)
        if (url) parsed.ppt_templates[type].url = url
      }
    })
  }

  parsed.licenses = { ...data.licenses }

  return parsed
}

export default formParser

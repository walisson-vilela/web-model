import { Form, IFormStores } from '../../interfaces'

const contactRecipientParser = (form: Form['manager_contact']) => {
  const payload = {
    name: form.name,
    contacts: [
      ...(form.phone_1 ? [{ type: 'PHONE', value: form.phone_1 }] : []),
      ...(form.phone_2 ? [{ type: 'PHONE', value: form.phone_2 }] : []),
      ...(form.email ? [{ type: 'EMAIL', value: form.email }] : []),
    ],
  }

  return payload
}

const payloadCommon = (
  isDirty: (field: keyof Form) => boolean,
  form: Form,
  id: number | null,
) => {
  const payload = {
    ...(id ? { id } : {}),

    ...(isDirty('document') ? { document: form.document } : {}),
    ...(isDirty('fantasy_name') ? { fantasy_name: form.fantasy_name } : {}),
    ...(isDirty('company_name') ? { company_name: form.company_name } : {}),
    ...(isDirty('situation_name')
      ? { situation_name: form.situation_name }
      : {}),
    ...((
      [
        'postal_code',
        'street_type',
        'street_name',
        'street_number',
        'complement',
        'sublocality_name',
        'city_name',
        'state_code',
      ] as (keyof Form)[]
    ).some(isDirty)
      ? {
          address: {
            postal_code: form.postal_code,
            street_type: form.street_type,
            street_name: form.street_address,
            street_number: form.street_number,
            complement: form.complement,
            sublocality_name: form.sublocality,
            city_name: form.city,
            state_code: form.state,
            country_name: 'Brasil',
          },
        }
      : {}),
  }

  return payload
}

const payloadStoresContractor = (
  isDirty: (field: keyof Form) => boolean,
  form: Form,
) => {
  const stores_contractor = {
    ...(isDirty('nickname') ? { nickname: form.nickname } : {}),
    ...(isDirty('segment')
      ? { segment_id: form.segment ? form.segment.id : null }
      : {}),
    ...(isDirty('market_flag')
      ? { market_flag_id: form.market_flag ? form.market_flag.id : null }
      : {}),
    ...(isDirty('typology')
      ? { typology_id: form.typology ? form.typology.id : null }
      : {}),
    ...(isDirty('classification')
      ? {
          classification_id: form.classification
            ? form.classification.id
            : null,
        }
      : {}),

    ...((
      [
        'lat',
        'lng',
        'radius',
        'geolocation_status',
        'geolocation_tolerance',
      ] as (keyof Form)[]
    ).some(isDirty)
      ? {
          coordinate: {
            lat: form.lat,
            lng: form.lng,
            radius: form.radius,
            status: form.geolocation_status,
            tolerance: form.geolocation_tolerance,
          },
        }
      : {}),
  }

  return stores_contractor
}

const payloadStorePDV = (
  isDirty: (field: keyof Form) => boolean,
  form: Form,
) => {
  const stores_contractor = {
    ...(isDirty('status') ? { status: form.status } : {}),
    ...(isDirty('code') ? { code: form.code } : {}),
    ...(isDirty('checkout')
      ? (() => {
          const [checkout_min = null, checkout_max = null] = (
            form.checkout || ''
          ).split(',')
          return { checkout_min, checkout_max }
        })()
      : {}),
    ...((['phone', 'email'] as (keyof Form)[]).some(isDirty)
      ? {
          contacts: [
            ...(form.phone ? [{ type: 'PHONE', value: form.phone }] : []),
            ...(form.email ? [{ type: 'EMAIL', value: form.email }] : []),
          ],
        }
      : {}),
    ...((
      [
        'manager_contact',
        'person_in_charge_1_contact',
        'person_in_charge_2_contact',
      ] as (keyof Form)[]
    ).some(isDirty)
      ? {
          contact_recipients: [
            ...(form.manager_contact.name
              ? [
                  {
                    sector: 'MANAGER',
                    ...contactRecipientParser(form.manager_contact),
                  },
                ]
              : []),
            ...(form.person_in_charge_1_contact.name
              ? [
                  {
                    sector: 'PERSON_IN_CHARGE',
                    ...contactRecipientParser(form.person_in_charge_1_contact),
                  },
                ]
              : []),
            ...(form.person_in_charge_2_contact.name
              ? [
                  {
                    sector: 'PERSON_IN_CHARGE',
                    ...contactRecipientParser(form.person_in_charge_2_contact),
                  },
                ]
              : []),
          ],
        }
      : {}),
  }

  return stores_contractor
}

const savedParser = (
  form: Form,
  dirtyFields: (keyof Form)[],
  id: number | null = null,
  mode: IFormStores['mode'],
) => {
  const isDirty = id
    ? (field: keyof Form) => dirtyFields.includes(field)
    : (field: keyof Form) => form[field] !== null

  const payload = {
    ...payloadCommon(isDirty, form, id),

    ...(mode !== 'stores'
      ? payloadStoresContractor(isDirty, form)
      : {
          stores_contractor: {
            ...payloadStoresContractor(isDirty, form),
            ...payloadStorePDV(isDirty, form),
          },
        }),
  }

  return payload
}

export default savedParser

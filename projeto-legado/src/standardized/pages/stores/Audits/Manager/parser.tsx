import moment from 'moment'

import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import StoreDetails from '../../Home/Manager/StoreDetails'

import { BodyInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: unknown[], page: number): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((data, e) => {
    if (
      !isObject(e) ||
      !isObject(e.address) ||
      !isObject(e.coordinate) ||
      !isObject(e.store) ||
      !isObject(e.store.address) ||
      !isObject(e.stores_contractor) ||
      !isObject(e.stores_contractor.coordinate) ||
      !isObject(e.creator)
    ) {
      return data
    }

    const id = numberOrDefault(e.id)
    const store_id = numberOrDefault(e.store.id)
    const created_at = dateOrDefault(e.created_at, null, 'YYYY-MM-DD HH:mm:ss')
    if (!id || !store_id || !created_at) return data

    const parsed: BodyInterface = {
      id,

      store_id,

      nickname_jsx: null,

      sublocality_name: '',

      city_name: '',

      state_code: '',

      created_by_jsx: '',

      created_by_role_jsx: '',

      created_at_jsx: moment(created_at).format('ddd - DD/MM/YYYY'),

      address: {
        formatted: notEmptyStringOrDefault(e.address.formatted, ''),
        postal_code: notEmptyStringOrDefault(e.address.postal_code, ''),
        street_type: notEmptyStringOrDefault(e.address.street_type, ''),
        street_name: notEmptyStringOrDefault(e.address.street_name, ''),
        street_number: notEmptyStringOrDefault(e.address.street_number, ''),
        state_code: notEmptyStringOrDefault(e.address.state_code, ''),
        city_name: notEmptyStringOrDefault(e.address.city_name, ''),
        sublocality_name: notEmptyStringOrDefault(
          e.address.sublocality_name,
          '',
        ),
      },

      coordinate: {
        lat: numberOrDefault(e.coordinate.lat, 0),
        lng: numberOrDefault(e.coordinate.lng, 0),
        radius: numberOrDefault(e.coordinate.radius, 50),
      },

      store: {
        id: store_id,
        nickname: notEmptyStringOrDefault(e.stores_contractor.nickname, ''),
        source_radius: numberOrDefault(e.store.source_radius, 200),

        address: {
          formatted: notEmptyStringOrDefault(e.store.address.formatted, ''),
          postal_code: notEmptyStringOrDefault(e.store.address.postal_code, ''),
          street_type: notEmptyStringOrDefault(e.store.address.street_type, ''),
          street_name: notEmptyStringOrDefault(e.store.address.street_name, ''),
          street_number: notEmptyStringOrDefault(
            e.store.address.street_number,
            '',
          ),
          state_code: notEmptyStringOrDefault(e.store.address.state_code, ''),
          city_name: notEmptyStringOrDefault(e.store.address.city_name, ''),
          sublocality_name: notEmptyStringOrDefault(
            e.store.address.sublocality_name,
            '',
          ),
          lat: numberOrDefault(e.store.address.lat, 0),
          lng: numberOrDefault(e.store.address.lng, 0),
        },

        coordinate: {
          lat: numberOrDefault(e.stores_contractor.coordinate.lat, 0),
          lng: numberOrDefault(e.stores_contractor.coordinate.lng, 0),
          radius: numberOrDefault(e.stores_contractor.coordinate.radius, 50),
          tolerance: numberOrDefault(
            e.stores_contractor.coordinate.tolerance,
            200,
          ),
        },
      },

      creator: {
        name: notEmptyStringOrDefault(e.creator.name, ''),
        ...(isObject(e.creator.user)
          ? {
              user: {
                id: numberOrDefault(e.creator.user.id, 0),
                role: isObject(e.creator.user.role)
                  ? {
                      id: numberOrDefault(e.creator.user.role.id, 0),
                      name: notEmptyStringOrDefault(
                        e.creator.user.role.name,
                        '',
                      ),
                    }
                  : {
                      id: 0,
                      name: '',
                    },
              },
            }
          : {}),
      },

      created_at: new Date(created_at),

      page,
      index: data.length,
    }

    parsed.nickname_jsx = (
      <StoreDetails name={parsed.store.nickname} store_id={parsed.store.id} />
    )
    parsed.sublocality_name = parsed.address.sublocality_name
    parsed.city_name = parsed.address.city_name
    parsed.state_code = parsed.address.state_code
    parsed.created_by_jsx = [
      ...(parsed.creator.user ? [parsed.creator.user.id] : []),
      parsed.creator.name,
    ].join(' - ')
    parsed.created_by_role_jsx = parsed.creator.user?.role.name || ''
    parsed.created_at_jsx = `${parsed.created_at_jsx[0].toUpperCase()}${parsed.created_at_jsx.slice(
      1,
    )}`

    return [...data, parsed]
  }, [])
}

export default parser

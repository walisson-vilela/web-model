import { GenericObject } from '@mw-kit/mw-ui/types'
import { AxiosResponse } from 'axios'

import axios from '../../../../../../services/Axios'
import { notEmptyStringOrDefault } from '../../../../../utils/formatters'
import { isObject, notEmptyString } from '../../../../../utils/validators'

import { Details } from './interface'

const parseRequestStoreDetails = (
  response: AxiosResponse<GenericObject, GenericObject>,
) => {
  const responseData = response.data
  const storeData: GenericObject = responseData.data

  const details: Details = {
    id: storeData.id ? storeData.id : null,
    name: notEmptyString(storeData.stores_contractor.nickname)
      ? storeData.stores_contractor.nickname
      : null,
    document: notEmptyString(storeData.document) ? storeData.document : null,
    group: null,
    network: null,
    flag: null,
    address: isObject(storeData.address)
      ? {
          formatted: storeData.address.formatted,
          postal_code: storeData.address.postal_code,
        }
      : null,
    phones: storeData.stores_contractor.contacts.filter(
      (phone: GenericObject) => phone.type === 'PHONE',
    ),
    contact: null,
    history: {
      planned: null,
      performed: null,
      attendances: { first: null, last: null },
    },
    classification: isObject(storeData.stores_contractor.classification)
      ? notEmptyStringOrDefault(storeData.stores_contractor.classification.name)
      : null,
    checkouts: notEmptyString(storeData.stores_contractor.checkout_label)
      ? storeData.stores_contractor.checkout_label
      : null,
    segment: isObject(storeData.stores_contractor.segment)
      ? {
          id: storeData.stores_contractor.segment.id,
          name: storeData.stores_contractor.segment.name,
        }
      : null,
  }

  if (Array.isArray(storeData.stores_contractor.contact_recipients)) {
    details.contact = storeData.stores_contractor.contact_recipients
      .map((r: GenericObject) => {
        return `${r.name} (${r.sector_label})`
      })
      .join(' | ')
  }

  if (
    storeData.stores_contractor.market_group instanceof Object &&
    storeData.stores_contractor.market_group.name
  ) {
    details.group = storeData.stores_contractor.market_group.name
  }

  if (
    storeData.stores_contractor.market_chain instanceof Object &&
    storeData.stores_contractor.market_chain.name
  ) {
    details.network = storeData.stores_contractor.market_chain.name
  }

  if (
    storeData.stores_contractor.market_flag instanceof Object &&
    storeData.stores_contractor.market_flag.name
  ) {
    details.flag = storeData.stores_contractor.market_flag
  }

  if (storeData.store_statistic_attendance instanceof Object) {
    const statistic = storeData.store_statistic_attendance

    details.history = {
      planned: statistic.planned ? statistic.planned : null,
      performed: statistic.perfoemed ? statistic.performed : null,
      attendances: {
        first: statistic.first_attendance ? statistic.first_attendance : null,
        last: statistic.last_attendance ? statistic.last_attendance : null,
      },
    }
  }

  return details
}

export const requestStoreDetails = async (
  store_id: number,
): Promise<Details> => {
  const response = await axios.get(`/v1/tr/stores/${store_id}`, {
    params: {
      contain: [
        'Classifications',
        'MarketGroups',
        'MarketChains',
        'MarketFlags',
        'StoreStatisticAttendances',
        'Segments',
        'Contacts',
        'ContactRecipients',
      ].join(),
    },
  })

  return parseRequestStoreDetails(response)
}

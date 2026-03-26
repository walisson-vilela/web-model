import { GenericObject } from '@mw-kit/mw-ui/types'
import { AxiosResponse } from 'axios'

import axios from '../../../../../../../services/Axios'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import { isObject, notEmptyString } from '../../../../../../utils/validators'

import { Details } from './interface'

const parseRequestStoreDetails = (
  response: AxiosResponse<GenericObject, GenericObject>,
) => {
  const responseData = response.data
  const storeData: GenericObject = responseData.data

  const details: Details = {
    id: storeData.id ? storeData.id : null,
    name: notEmptyString(storeData.nickname) ? storeData.nickname : null,
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

    classification: isObject(storeData.classification)
      ? notEmptyStringOrDefault(storeData.classification.name)
      : null,

    segment: isObject(storeData.segment)
      ? {
          id: storeData.segment.id,
          name: storeData.segment.name,
        }
      : null,
  }

  if (storeData.market_group instanceof Object && storeData.market_group.name) {
    details.group = storeData.market_group.name
  }

  if (storeData.market_chain instanceof Object && storeData.market_chain.name) {
    details.network = storeData.market_chain.name
  }

  if (storeData.market_flag instanceof Object && storeData.market_flag.name) {
    details.flag = storeData.market_flag
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
      mode: 'store',
    },
  })

  return parseRequestStoreDetails(response)
}

import { GenericObject } from '@mw-kit/mw-ui/types'

import Bullet from '../../../../../components/Bullet'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import { PopupAddress, PopupFlags } from '../../BaseStores/Manager/Popups'
import { sourceStatusOrDefault } from '../../functions'

import StoreDetails from './StoreDetails'
import { BodyInterface } from './interfaces'
import {
  covered as coveredLabels,
  status as statusLabels,
  validated as validatedLabels,
} from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: GenericObject[]): BodyInterface[] => {
  return data.map((e) => {
    const id = numberOrDefault(e.id)

    const item: BodyInterface = {
      id,
      status: null,
      status_jsx: null,
      validated: null,
      validated_jsx: null,
      covered: null,
      covered_jsx: null,
      code: null,
      name: null,
      name_jsx: null,
      formatted_address: null,
      flag_name: null,

      segment_name: null,
      typology_name: null,
    }

    if (isObject(e.address)) {
      const address = {
        formatted: notEmptyStringOrDefault(e.address.formatted, ''),
        source_status: sourceStatusOrDefault(e.source_status, null),
        postal_code: notEmptyStringOrDefault(e.address.postal_code, ''),
      }

      item.formatted_address = <PopupAddress {...address} />
    }

    if (!isObject(e.stores_contractor)) return item

    item.status = booleanOrDefault(e.stores_contractor.status)
    if (item.status !== null) {
      const { name, color } = { ...statusLabels[item.status ? 1 : 0] }
      item.status_jsx = <Bullet content={name} color={color} />
    }

    if (isObject(e.stores_contractor.coordinate)) {
      item.validated = notEmptyStringOrDefault(
        e.stores_contractor.coordinate.status_label,
      )
      if (item.validated !== null) {
        const status = booleanOrDefault(e.stores_contractor.coordinate.status)
        item.validated_jsx =
          validatedLabels[status === null ? '' : status ? 1 : 0]
      }
    }

    item.covered = booleanOrDefault(e.stores_contractor.covered)
    if (item.covered !== null) {
      item.covered_jsx = coveredLabels[item.covered ? 1 : 0]
    }

    item.code = notEmptyStringOrDefault(e.stores_contractor.code)

    item.name_jsx = item.name = notEmptyStringOrDefault(
      e.stores_contractor.nickname,
    )

    if (id !== null && item.name !== null) {
      item.name_jsx = <StoreDetails name={item.name} store_id={id} />
    }

    if (isObject(e.stores_contractor.segment)) {
      item.segment_name = notEmptyStringOrDefault(
        e.stores_contractor.segment.name,
      )
    }

    if (isObject(e.stores_contractor.typology)) {
      item.typology_name = notEmptyStringOrDefault(
        e.stores_contractor.typology.name,
      )
    }

    if (
      isObject(e.stores_contractor.market_flag) &&
      isObject(e.stores_contractor.market_chain) &&
      isObject(e.stores_contractor.market_group)
    ) {
      const names = {
        market_flag_name: notEmptyStringOrDefault(
          e.stores_contractor.market_flag.name,
          '-',
        ),
        market_group_name: notEmptyStringOrDefault(
          e.stores_contractor.market_group.name,
          '-',
        ),
        market_network_name: notEmptyStringOrDefault(
          e.stores_contractor.market_chain.name,

          '-',
        ),
      }

      item.flag_name = <PopupFlags {...names} />
    }

    return item
  })
}

export default parser

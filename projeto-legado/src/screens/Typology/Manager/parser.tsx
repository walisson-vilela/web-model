import React from 'react'

import { isBoolean } from 'lodash'

import Bullet from '../../../components/Bullet'
import { formatPercent } from '../../../standardized/utils/formatters/numbers'
import { booleanOrDefault, numberOrDefault } from '../../../utils/Formatters'
import { Link } from '../styles'

import * as Modals from './Modals'
import { isUnknownTypology } from './functions'
import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[], isOpen: Function): BodyInterface[] => {
  return data.map((e): BodyInterface => {
    const data: BodyInterface = {
      active: null,
      active_jsx: null,
      contractor_id: e.hasOwnProperty('contractor_id') ? e.contractor_id : null,
      created_at: e.hasOwnProperty('created_at') ? e.created_at : null,
      created_by: e.hasOwnProperty('created_by') ? e.created_by : null,
      default:
        e.hasOwnProperty('default') && e.default ? 'Padrão' : 'Personalizado',
      default_id: e.hasOwnProperty('default_id') ? e.default_id : null,
      deleted: e.hasOwnProperty('deleted') ? e.deleted : null,
      deleted_at: e.hasOwnProperty('deleted_at') ? e.deleted_at : null,
      deleted_by: e.hasOwnProperty('deleted_by') ? e.deleted_by : null,
      id: e.hasOwnProperty('id') ? e.id : null,
      list: booleanOrDefault(e.list),
      modified_at: e.hasOwnProperty('modified_at') ? e.modified_at : null,
      modified_by: e.hasOwnProperty('modified_by') ? e.modified_by : null,
      name: e.hasOwnProperty('name') ? e.name : null,
      recalculate: e.hasOwnProperty('recalculate') ? e.recalculate : null,
      recovered_at: e.hasOwnProperty('recovered_at') ? e.recovered_at : null,
      recovered_by: e.hasOwnProperty('recovered_by') ? e.recovered_by : null,
      store_number: e.hasOwnProperty('store_count') ? e.store_count : null,
      store_count: e.hasOwnProperty('store_count') ? (
        e.store_count > 0 ? (
          <Link
            onClick={() =>
              isOpen(
                <Modals.AssociatedPDVModal
                  setOpen={isOpen}
                  dataBasics={{
                    id: e.id,
                    name: e.name,
                    count: e.store_count,
                    default_id: e.default_id,
                  }}
                />,
              )
            }
          >
            {e.store_count}
          </Link>
        ) : (
          <React.Fragment>-</React.Fragment>
        )
      ) : null,
      store_percentage: null,
    }

    const store_percentage = numberOrDefault(e.store_percentage)
    if (store_percentage) {
      data.store_percentage = formatPercent(store_percentage)
    }

    if (isBoolean(e.active)) {
      data.active = e.active
      const status = statusLabels[e.active ? 1 : 0]
      if (!isUnknownTypology(data)) {
        data.active_jsx = <Bullet content={status.name} color={status.color} />
      } else {
        data.active_jsx = <div style={{ textAlign: 'center' }}>-</div>
      }
    }

    return data
  })
}

export default parser

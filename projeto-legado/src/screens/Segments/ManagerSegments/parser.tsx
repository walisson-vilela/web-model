import React from 'react'

import Bullet from '../../../components/Bullet'
import { formatPercent } from '../../../standardized/utils/formatters/numbers'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import AssociatedPDVs from '../AssociatedPDVs'
import * as S from '../styled'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[], setModal: Function): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      status: booleanOrDefault(e.status, false),
      status_jsx: null,
      name: notEmptyStringOrDefault(e.name),
      default_id: numberOrDefault(e.default_id),
      default: booleanOrDefault(e.default),
      default_label: notEmptyStringOrDefault(e.default_label),
      store_percentage: numberOrDefault(e.store_percentage, 0),
      store_percentage_txt: null,

      store_count: numberOrDefault(e.store_count, 0),
      store_count_jsx: null,
    }

    const { name, color } = { ...statusLabels[!item.status ? 0 : 1] }
    item.status_jsx = <Bullet content={name} color={color} />

    if (item.store_percentage !== 0) {
      item.store_percentage_txt = formatPercent(item.store_percentage)
    }

    if (item.store_count !== 0) {
      item.store_count_jsx = (
        <S.Link
          onClick={() =>
            setModal(
              <AssociatedPDVs
                item={{
                  segment_id: item.id,
                  name: item.name,
                  store_count: item.store_count,
                }}
                title={
                  <React.Fragment>
                    Canal: <b>{item.name}</b> - {item.store_count} PDVs
                    associados
                  </React.Fragment>
                }
                closeModal={() => setModal(null)}
              />,
            )
          }
        >
          {item.store_count}
        </S.Link>
      )
    }
    return item
  })
}

export default parser

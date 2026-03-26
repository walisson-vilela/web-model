import React from 'react'

import { isBoolean } from 'lodash'

import Bullet from '../../../components/Bullet'
import Popup from '../../../components/ManagerColumnPopup'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isNumber, isObject, notEmptyString } from '../../../utils/Validators'
import AssociatedPDVs from '../AssociatedPDVs'
import getDistributionCenterDetails from '../DistributionCenterDetails'
import Particularities from '../Particularities'
import * as S from '../styled'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[], setModal: Function): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      name: null,
      name_jsx: null,
      active: null,
      active_jsx: null,
      flag_name: null,
      city_name: null,
      state_name: null,
      store_id: numberOrDefault(e.store_id),
      store_count: numberOrDefault(e.store_count),
      store_count_jsx: null,
      apportionment: numberOrDefault(e.apportionment),
      apportionment_name: notEmptyStringOrDefault(e.apportionment_name),
      category_count: numberOrDefault(e.category_count),
      particularities_jsx: null,
    }

    let name_jsx = '-'

    if (notEmptyString(e.name)) name_jsx = item.name = e.name

    item.name_jsx = (
      <Popup
        trigger={name_jsx}
        getContent={async (): Promise<JSX.Element> =>
          getDistributionCenterDetails(item.id)
        }
      />
    )

    if (isBoolean(e.active)) {
      item.active = e.active

      const { name, color } = { ...statusLabels[item.active.toString()] }
      item.active_jsx = <Bullet content={name} color={color} />
    }

    if (isObject(e.stores_one)) {
      if (isObject(e.stores_one.market_flag))
        item.flag_name = notEmptyStringOrDefault(e.stores_one.market_flag.name)

      item.city_name = notEmptyStringOrDefault(e.stores_one.city)
      item.state_name = notEmptyStringOrDefault(e.stores_one.state)
    }

    const modalTitle = (
      <React.Fragment>
        Central: <b>{item.name || '-'}</b> - Bandeira:{' '}
        <b>{item.flag_name || '-'}</b> | Cidade/UF:{' '}
        <b>
          {item.city_name || '-'}/{item.state_name || '-'}
        </b>
      </React.Fragment>
    )

    if (isNumber(item.store_count)) {
      item.store_count_jsx =
        item.store_count === 0 ? (
          item.store_count
        ) : (
          <S.Link
            onClick={() =>
              setModal(
                <AssociatedPDVs
                  item={{
                    distribution_center_id: item.id,
                  }}
                  title={modalTitle}
                  closeModal={() => setModal(null)}
                />,
              )
            }
          >
            {item.store_count}
          </S.Link>
        )
    }

    if (isNumber(item.category_count)) {
      item.particularities_jsx =
        item.category_count === 0 ? (
          'Não'
        ) : (
          <S.Link
            onClick={() =>
              setModal(
                <Particularities
                  distribution_center_id={item.id}
                  title={modalTitle}
                  closeModal={() => setModal(null)}
                />,
              )
            }
          >
            Sim
          </S.Link>
        )
    }

    return item
  })
}

export default parser

import React from 'react'

import { Dropdown, EllipsisContainer } from '@mw-kit/mw-manager'
import { isNumber } from 'lodash'
import moment from 'moment'
import toast from 'react-hot-toast'
import { Icon } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { numberOrDefault } from '../../../../utils/Formatters'
import { notEmptyString } from '../../../../utils/Validators'
import AssociatedPDVs from '../../AssociatedPDVs'
import Particularities from '../../Particularities'
import * as S from '../styled'

import { BodyInterface, DataInterface } from './interfaces'
import { updateHistory } from './services'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  distribution_center_id: number,
  setModal: Function,
  title: JSX.Element | string,
  reload: Function,
  setLoading: Function,
): BodyInterface[] => {
  const parsed = data.map((e) => {
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      reference: null,
      reference_txt: null,
      distribution_center_id: numberOrDefault(e.distribution_center_id),
      apportionment: numberOrDefault(e.apportionment),
      store_count: numberOrDefault(e.store_count),
      store_count_jsx: null,
      category_count: numberOrDefault(e.category_count),
      particularities_jsx: null,
      apportionment_name: null,
      apportionment_jsx: null,
      canReprocess: false,
    }

    if (notEmptyString(e.apportionment_name)) {
      item.apportionment_jsx = item.apportionment_name = e.apportionment_name
    }

    if (notEmptyString(e.reference)) {
      item.reference = e.reference
      item.reference_txt = moment(e.reference).format('MMM/YYYY')

      const today = new Date()
      const todayMonth = today.getMonth()

      const reference = new Date(item.reference)
      const referenceMonth = reference.getMonth()

      const todaym = todayMonth < referenceMonth ? todayMonth + 12 : todayMonth

      const diff = todaym - referenceMonth

      if (diff < 2) {
        item.canReprocess = true

        if (diff === 1) {
          const onClickApportionment = async (apportionment: number) => {
            if (apportionment === item.apportionment) return

            // fechando o dropdown
            const a = document.createElement('a')
            document.body.appendChild(a)
            a.click()
            a.remove()

            setLoading(true)

            try {
              const response = await updateHistory(
                distribution_center_id,
                item.id,
                { apportionment },
              )
              if (!response.success)
                throw new Error('Request returned no success')
              toast(<ToasterContent color='normal' />, SuccessStyle)
              reload()
            } catch (e) {
              console.error(e)
              toast(<ToasterContent color='error' />, ErrorStyle)
              setLoading(false)
            }
          }

          item.apportionment_jsx = (
            <Dropdown
              loading={false}
              axis='y'
              items={[
                {
                  content: 'Linear',
                  onClick: () => onClickApportionment(0),
                  rules: [],
                },
                {
                  content: 'Ponderado Faturamento',
                  onClick: () => onClickApportionment(1),
                  rules: [],
                },
                {
                  content: 'Não se Aplica',
                  onClick: () => onClickApportionment(2),
                  rules: [],
                },
              ]}
              centerCoodinates={{ y: 60 }}
            >
              <S.Link>
                <EllipsisContainer>
                  <S.BlackText>{item.apportionment_name}</S.BlackText>
                  <Icon name='caret down' />
                </EllipsisContainer>
              </S.Link>
            </Dropdown>
          )
        }
      }
    }

    if (isNumber(item.store_count)) {
      item.store_count_jsx =
        item.store_count < 1 ? (
          item.store_count
        ) : (
          <S.Link
            onClick={() =>
              setModal(
                <AssociatedPDVs
                  item={{
                    distribution_center_id: item.id,
                  }}
                  title={title}
                  closeModal={() => setModal(null)}
                  historic
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
                  title={title}
                  closeModal={() => setModal(null)}
                  historic
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

  return parsed
}

export default parser

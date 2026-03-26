import React from 'react'

import moment from 'moment'

import ManagerColumnPopup from '../../../../components/ManagerColumnPopup'
import { ModalState } from '../../../../components/MwModal'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import { getPeopleDetails, getStoreDetails } from './components/Details'
import { Modal } from './components/Modal'
import { Attempts, Map, Photo } from './components/Modal/components'
import { types } from './components/Popups/checkin-checkoutoptions'
import { StatusNotification } from './components/StatusNotification'
import { BodyInterface, DataInterface } from './interfaces'
import * as S from './styled'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  setModal: (modal: ModalState) => void,
  setOpen?: React.Dispatch<React.SetStateAction<JSX.Element>>,
): BodyInterface[] => {
  const today = moment()
  today.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })

  return data.map((e) => {
    console.log(e)
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      people_id: numberOrDefault(e.people_id),
      attendance_status: notEmptyStringOrDefault(e.attendance_status),
      attendances_status_jsx: null,
      route_name: notEmptyStringOrDefault(e.route_name),
      store_name: notEmptyStringOrDefault(e.store_name),
      store_name_jsx: null,
      store_id: numberOrDefault(e.store_id),
      store_validated: notEmptyStringOrDefault(e.store_name),
      attendance_origin: notEmptyStringOrDefault(e.attendance_origin),
      duration_planned: notEmptyStringOrDefault(e.duration_planned),
      check_in: notEmptyStringOrDefault(e.check_in),
      check_in_jsx: null,
      check_out: notEmptyStringOrDefault(e.check_out),
      check_out_jsx: null,
      duration: notEmptyStringOrDefault(e.duration),
      people_name: notEmptyStringOrDefault(e.people_name),
      people_name_jsx: null,
      check_in_type: numberOrDefault(e.check_in_type),
      check_in_attempts_count: numberOrDefault(e.check_in_attempts_count),
      check_out_type: numberOrDefault(e.check_out_type),
      check_out_attempts_count: numberOrDefault(e.check_in_attempts_count),
      reason: notEmptyStringOrDefault(e.reason),
      people_justify_name: notEmptyStringOrDefault(e.people_justify_name),
      justify_at: notEmptyStringOrDefault(e.justify_at),
    }
    item.store_name_jsx = (
      <ManagerColumnPopup
        position='right center'
        trigger={item.store_name}
        getContent={async (): Promise<JSX.Element> =>
          await getStoreDetails(item.store_id)
        }
      />
    )

    item.attendances_status_jsx = (
      <StatusNotification
        data={{
          attendance_status: item.attendance_status,
          justify_at: item.justify_at,
          people_justify_name: item.people_justify_name,
          reason: item.reason,
        }}
      />
    )

    item.check_in_jsx =
      item.check_in_type === 0 ? (
        <S.Item
          onClick={() =>
            setOpen(
              <Modal
                data={{
                  title: 'Dados de Validação do Checkin',
                  options: [
                    {
                      label: 'Confirmar Checkin',
                      component: (
                        <Map static_attendences_id={item.id} type='check_in' />
                      ),
                    },
                    {
                      label: 'Tentativa e erro',
                      component: <Attempts provider='checkin' id={item.id} />,
                    },
                  ],
                  onClose: () => setOpen(null),
                }}
              />,
            )
          }
        >
          <S.Item>
            <S.TextWrapper>
              {item.check_in_attempts_count > 99 ? (
                <S.RedText> +99 </S.RedText>
              ) : (
                <React.Fragment>
                  {item.check_in} {types[item.check_in_type].icon()}
                  {item.check_in_attempts_count > 0 && (
                    <S.RedText> {item.check_in_attempts_count}</S.RedText>
                  )}
                </React.Fragment>
              )}
            </S.TextWrapper>
          </S.Item>
        </S.Item>
      ) : item.check_in_type === 1 ? (
        <S.Item
          onClick={() =>
            setOpen(
              <Modal
                data={{
                  title: 'Dados de Validação do Checkin',
                  options: [
                    {
                      label: 'Confirmar Checkin',
                      component: <Photo type='check_in_photo' id={item.id} />,
                    },
                    {
                      label: 'Tentativa e erro',
                      component: <Attempts provider='checkin' id={item.id} />,
                    },
                  ],
                  onClose: () => setOpen(null),
                }}
              />,
            )
          }
        >
          <S.Item>
            <S.TextWrapper>
              {item.check_in_attempts_count > 99 ? (
                <S.RedText> +99 </S.RedText>
              ) : (
                <React.Fragment>
                  {item.check_in} {types[item.check_in_type].icon()}
                  {item.check_in_attempts_count > 0 && (
                    <S.RedText> {item.check_in_attempts_count}</S.RedText>
                  )}
                </React.Fragment>
              )}
            </S.TextWrapper>
          </S.Item>
        </S.Item>
      ) : (
        <ManagerColumnPopup
          position='bottom center'
          trigger={
            <S.Item>
              {item.check_in_attempts_count > 99 ? (
                <S.RedText> +99 </S.RedText>
              ) : (
                <React.Fragment>
                  {item.check_in} {types[item.check_in_type].icon()}
                  {item.check_in_attempts_count > 0 && (
                    <S.RedText> {item.check_in_attempts_count}</S.RedText>
                  )}
                </React.Fragment>
              )}
            </S.Item>
          }
          getContent={async (): Promise<JSX.Element> =>
            types[item.check_in_type].handler(item, 'check-in')
          }
        />
      )

    item.check_out_jsx =
      item.check_out_type === 0 ? (
        <S.Item
          onClick={() =>
            setOpen(
              <Modal
                data={{
                  title: 'Dados de Validação do Checkout',
                  options: [
                    {
                      label: 'Confirmar Checkout',
                      component: (
                        <Map static_attendences_id={item.id} type='check_out' />
                      ),
                    },
                    {
                      label: 'Tentativa e erro',
                      component: <Attempts provider='checkout' id={item.id} />,
                    },
                  ],
                  onClose: () => setOpen(null),
                }}
              />,
            )
          }
        >
          <S.Item>
            <S.TextWrapper>
              {item.check_out_attempts_count > 99 ? (
                <S.RedText> +99 </S.RedText>
              ) : (
                <React.Fragment>
                  {item.check_out} {types[item.check_out_type].icon()}{' '}
                  {item.check_out_attempts_count > 0 && (
                    <S.RedText> {item.check_out_attempts_count}</S.RedText>
                  )}
                </React.Fragment>
              )}
            </S.TextWrapper>
          </S.Item>
        </S.Item>
      ) : item.check_out_type === 1 ? (
        <S.Item
          onClick={() =>
            setOpen(
              <Modal
                data={{
                  title: 'Dados de Validação do Checkout',
                  options: [
                    {
                      label: 'Confirmar Checkin',
                      component: <Photo type='check_out_photo' id={item.id} />,
                    },
                    {
                      label: 'Tentativa e erro',
                      component: <Attempts provider='checkout' id={item.id} />,
                    },
                  ],
                  onClose: () => setOpen(null),
                }}
              />,
            )
          }
        >
          <S.Item>
            <S.TextWrapper>
              {item.check_out_attempts_count > 99 ? (
                <S.RedText> +99 </S.RedText>
              ) : (
                <React.Fragment>
                  {item.check_out} {types[item.check_out_type].icon()}{' '}
                  {item.check_out_attempts_count > 0 && (
                    <S.RedText> {item.check_out_attempts_count}</S.RedText>
                  )}
                </React.Fragment>
              )}
            </S.TextWrapper>
          </S.Item>
        </S.Item>
      ) : (
        <ManagerColumnPopup
          position='bottom center'
          trigger={
            <S.Item>
              {item.check_out_attempts_count > 99 ? (
                <S.RedText> +99 </S.RedText>
              ) : (
                <React.Fragment>
                  {item.check_out} {types[item.check_out_type].icon()}{' '}
                  {item.check_out_attempts_count > 0 && (
                    <S.RedText> {item.check_out_attempts_count}</S.RedText>
                  )}
                </React.Fragment>
              )}
            </S.Item>
          }
          getContent={async (): Promise<JSX.Element> =>
            types[item.check_out_type].handler(item, 'check-out')
          }
        />
      )

    item.people_name_jsx = (
      <ManagerColumnPopup
        position='left center'
        trigger={item.people_name}
        getContent={async (): Promise<JSX.Element> =>
          await getPeopleDetails(item.people_id)
        }
      />
    )

    return item
  })
}

export default parser

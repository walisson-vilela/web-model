import React from 'react'

import moment from 'moment'
import { Cookies } from 'react-cookie'
import { FiClock, FiFileText } from 'react-icons/fi'

import Bullet from '../../../components/Bullet'
import Popup from '../../../components/ManagerColumnPopup'
import axios from '../../../services/Axios'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'
import JustificationNonAttendance from '../modals/JustificationNonAttendance'

import { BodyInterface, DataInterface } from './interfaces'
import * as S from './styles'

const parser = (
  tabId: number,
  data: DataInterface[],
  setModal: React.Dispatch<React.SetStateAction<JSX.Element>>,
): BodyInterface[] => {
  if (tabId === 1) {
    return data.map((e) => {
      const item: BodyInterface = {
        id: numberOrDefault(e.id),
        userName: notEmptyStringOrDefault(e.people.name),
        created_at:
          e.created_at !== null
            ? moment(e.created_at).format('DD/MM/YYYY')
            : '',
        people_jsx: (
          <Bullet
            content={e.people.name}
            color={e.people.user.active === 1 ? '#66bb6a' : '#ef5350'}
          />
        ),
        justify_type:
          isObject(e.justify_type) &&
          notEmptyStringOrDefault(e.justify_type.name, ''),
        start: notEmptyStringOrDefault(e.start),
        end: notEmptyStringOrDefault(e.end),
        period_jsx: null,
        fileUrl: isObject(e.file)
          ? notEmptyStringOrDefault(e.file.url.replaceAll('\\', ''))
          : null,
        fileId: numberOrDefault(e.file ? e.file.id : null),
        fileHash: notEmptyStringOrDefault(e.file ? e.file.hash : ''),
        file_jsx: null,
        userActive: numberOrDefault(e.people.user.active),
        impact_stores: numberOrDefault(e.impact_stores),
        impact_days: numberOrDefault(e.impact_days),
        impact_attendances: numberOrDefault(e.impact_attendances),
        impact_jsx: '',
        action: numberOrDefault(e.audit_due_days),
        action_jsx: null,
        status_label: isObject(e.audit)
          ? notEmptyStringOrDefault(e.audit.status_label)
          : '',
      }

      item.period_jsx =
        item.start === null && item.end === null ? (
          ''
        ) : (
          <React.Fragment>
            {' '}
            {moment(e.start).format('DD/MM/YYYY')} a{' '}
            {moment(e.end).format('DD/MM/YYYY')}
          </React.Fragment>
        )
      item.file_jsx =
        item.fileId !== null ? (
          <Popup
            position={'left center'}
            style={{ border: 'none' }}
            trigger={'Sim'}
            getContent={async () => {
              let image: any
              const cookies = new Cookies()
              const token = cookies.get('_GIV_USER').token
              try {
                const { data } = await axios.get(
                  `https://cache.traderesult.app/v1/files/image/${item.fileId}/resize/120/${item.fileHash}`,
                  {
                    responseType: 'arraybuffer',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                )
                const preview = Buffer.from(data).toString('base64')
                image = 'data:image/png;base64,' + preview
              } catch (error) {
                console.log(error)
              }

              return (
                <S.UploadImage>
                  <div>
                    <img src={image} alt={'Imagem de um atestado'} />
                  </div>
                </S.UploadImage>
              )
            }}
          />
        ) : (
          '-'
        )
      item.impact_jsx = (
        <S.ImpactContainer>
          {' '}
          {`${item.impact_days}(Dia) | ${item.impact_stores}(PDV) | ${item.impact_attendances} (Atendimento)`}
        </S.ImpactContainer>
      )
      item.action_jsx = (
        <S.ActionContainer
          days={item.action}
          onClick={() =>
            setModal(
              <JustificationNonAttendance
                registerId={item.id}
                setOpenModal={setModal}
                tabId={tabId}
              />,
            )
          }
        >
          <span> Análise</span>
          <FiClock className='area' />
        </S.ActionContainer>
      )
      return item
    })
  } else {
    return data.map((e) => {
      const item: BodyInterface = {
        id: numberOrDefault(e.id),
        userName: notEmptyStringOrDefault(e.people.name),
        created_at:
          e.created_at !== null
            ? moment(e.created_at).format('DD/MM/YYYY')
            : '',
        people_jsx: (
          <Bullet
            content={e.people.name}
            color={e.people.user.active === 1 ? '#66bb6a' : '#ef5350'}
          />
        ),
        userActive: numberOrDefault(e.people.user.active),
        justify_type:
          isObject(e.justify_type) &&
          notEmptyStringOrDefault(e.justify_type.name, ''),
        start: notEmptyStringOrDefault(e.start),
        end: notEmptyStringOrDefault(e.end),
        period_jsx: null,
        fileUrl: isObject(e.file) ? notEmptyStringOrDefault(e.file.url) : null,
        fileHash: notEmptyStringOrDefault(e.file ? e.file.hash : ''),
        fileId: numberOrDefault(e.file ? e.file.id : null),
        file_jsx: null,
        impact_stores: numberOrDefault(e.impact_stores),
        impact_days: numberOrDefault(e.impact_days),
        impact_attendances: numberOrDefault(e.impact_attendances),
        impact_jsx: '',
        action: numberOrDefault(e.audit_due_days),
        action_jsx: null,
        status_label: isObject(e.audit)
          ? notEmptyStringOrDefault(e.audit.status_label)
          : null,
        reproveAuthor: isObject(e.audit)
          ? notEmptyStringOrDefault(e.audit.creator.name)
          : '',
        reprovedMessage: e.audit && notEmptyStringOrDefault(e.audit.obs),
      }
      item.impact_jsx = (
        <S.ImpactContainer>
          {' '}
          {`${item.impact_days}(Dia) | ${item.impact_stores}(PDV) | ${item.impact_attendances} (Atendimento)`}
        </S.ImpactContainer>
      )
      ;(item.period_jsx =
        item.start === null || item.end === null ? (
          ''
        ) : (
          <React.Fragment>
            {' '}
            {moment(e.start).format('DD/MM/YYYY')} a{' '}
            {moment(e.end).format('DD/MM/YYYY')}
          </React.Fragment>
        )),
        (item.file_jsx =
          item.fileId !== null ? (
            <Popup
              position={'left center'}
              style={{ border: 'none' }}
              trigger={'Sim'}
              getContent={async () => {
                let image: any
                const cookies = new Cookies()
                const token = cookies.get('_GIV_USER').token
                try {
                  const { data } = await axios.get(
                    `https://cache.traderesult.app/v1/files/image/${item.fileId}/resize/120/${item.fileHash}`,
                    {
                      responseType: 'arraybuffer',
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  )
                  const preview = Buffer.from(data).toString('base64')
                  image = 'data:image/png;base64,' + preview
                } catch (error) {
                  console.log(error)
                }

                return (
                  <S.UploadImage>
                    <div>
                      <img src={image} alt={'Imagem de um atestado'} />
                    </div>
                  </S.UploadImage>
                )
              }}
            />
          ) : (
            '-'
          ))
      item.action_jsx = (
        <React.Fragment>
          {item.status_label === 'Reprovado' ? (
            <S.Item>
              <span
                onClick={() =>
                  setModal(
                    <JustificationNonAttendance
                      registerId={item.id}
                      setOpenModal={setModal}
                      tabId={tabId}
                    />,
                  )
                }
              >
                {item.status_label}
              </span>
              {item && item.reprovedMessage !== null && (
                <Popup
                  style={{ margin: 0, padding: 0 }}
                  trigger={<FiFileText size={14} />}
                  position={'left center'}
                  getContent={async () => (
                    <S.PopupContainer>
                      <S.PopUp>
                        <strong> Observação </strong>
                        <strong>
                          {' '}
                          Por: <span> {item.reproveAuthor}</span>
                        </strong>
                      </S.PopUp>
                      <S.PopUpMain>
                        <p>{item.reprovedMessage}</p>
                      </S.PopUpMain>
                    </S.PopupContainer>
                  )}
                />
              )}
            </S.Item>
          ) : (
            <S.Item
              onClick={() =>
                setModal(
                  <JustificationNonAttendance
                    registerId={item.id}
                    setOpenModal={setModal}
                    tabId={tabId}
                  />,
                )
              }
            >
              {' '}
              {item.status_label}
            </S.Item>
          )}
        </React.Fragment>
      )
      return item
    })
  }
}

export default parser

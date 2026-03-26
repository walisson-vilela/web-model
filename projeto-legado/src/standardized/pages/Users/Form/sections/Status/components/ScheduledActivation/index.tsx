import React, { useState } from 'react'

import { MwGrid, MwIcon } from '@mw-kit/mw-ui'

import { dateOrDefault } from '../../../../../../../../utils/Formatters'
import Popup from '../../../../../../../components/Popup'
import useFormContext from '../../../../context'
import Info from '../Info'

import InterruptedEventModal from './Modal/InterruptedEvent'
import PickDate from './inputs/PickDate'
import * as S from './styles'

const ScheduledActivation = () => {
  const {
    data,
    modal: [, setModal],
    loadData,
  } = useFormContext()

  const [open, setOpen] = useState(false)

  const { event_user } = data
  if (!event_user || !event_user.event || !event_user.event.ends_at) return null
  const { event } = event_user
  if (!event || !event.ends_at) return null

  return (
    <React.Fragment>
      <MwGrid.Row>
        <S.Col $isBlue>
          <S.Container>
            Esse usuário encontra-se <b> Inativo</b> mas contém uma{' '}
            <b>Ativação Programada</b> - Data da execução{' '}
            <div style={{ display: 'flex' }}>
              (
              <Popup
                on='click'
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                trigger={
                  <S.Container style={{ cursor: 'pointer' }}>
                    <b>{dateOrDefault(event.ends_at, '-', 'DD/MM/YYYY')}</b>

                    <MwIcon
                      color={'blue'}
                      type='feather'
                      icon='edit_2'
                      width={12}
                      height={12}
                      strokeWidth='3px'
                    />
                  </S.Container>
                }
                content={
                  <div>
                    <PickDate eventId={event.id} close={() => setOpen(false)} />
                  </div>
                }
                position='bottom center'
              />
              )
            </div>{' '}
            - Ação realizada por{' '}
            <div>
              (<b>{data.event_user?.creator?.name ?? '-'}</b>)
            </div>
          </S.Container>

          <S.Link
            onClick={() =>
              setModal(
                <InterruptedEventModal
                  userId={data.id}
                  eventId={event.id}
                  reload={() => loadData()}
                  close={() => setModal(null)}
                />,
              )
            }
            $isBlue
            children='Interromper'
          />
        </S.Col>
      </MwGrid.Row>

      <Info />
    </React.Fragment>
  )
}

export default ScheduledActivation

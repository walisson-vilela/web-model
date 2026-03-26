import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { formatPeriod } from '../../../../../../../../screens/Users/Modals/EventsManager/components/Grid/components/Details/function'
import useFormContext from '../../../../context'
import Info from '../Info'
import Switch from '../Switch'
import * as S from '../styles'

const Temporary = () => {
  const { data } = useFormContext()

  const { event_user } = data
  if (!event_user || !event_user.event || !event_user.event.ends_at) return null
  const { event } = event_user
  if (!event || !event.ends_at) return null

  return (
    <React.Fragment>
      <MwGrid.Row>
        <S.Col>
          <div>
            Esse usuário encontra-se inativo <b>Temporário</b> - Motivo:{' '}
            {event.classification?.name || event.name || '-'} - Ação realizada
            por ({event_user.creator?.name || '-'}) - Período:{' '}
            {formatPeriod(
              new Date(event.starts_at),
              event.ends_at ? new Date(event.ends_at) : null,
            )}
          </div>
        </S.Col>
      </MwGrid.Row>

      <Info>
        <Switch event_count={data.event_count} checked={false} />
      </Info>
    </React.Fragment>
  )
}

export default Temporary

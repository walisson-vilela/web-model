import { useCallback, useMemo, useState } from 'react'

import { MwButton, MwGrid, MwScrollContainer } from '@mw-kit/mw-ui'
import moment from 'moment'

import type { ReactState } from '../../../../../../../../../../../types'
import { isValidIntervalTime, splitTime } from '../../../../../../../functions'
import type { Event } from '../../../../../../../types'
import * as S from '../../styles'

import { HeaderComponent } from './components/HeaderComponent'
import { RowContent } from './components/HeaderComponent/RowContent'

export const Content = (props: {
  event: ReactState<Event>
  close: () => void
}) => {
  const {
    event: [event, setEvent],
    close,
  } = props

  const [start, setStart] = useState(() => {
    const start = moment(event.start, true)
    return start.format('HH:mm')
  })

  const [end, setEnd] = useState(() => {
    const end = moment(event.end, true)
    return end.format('HH:mm')
  })

  const onSubmit = useCallback(() => {
    const s = new Date(event.start)
    s.setHours(...splitTime(start))
    const e = new Date(event.end)
    e.setHours(...splitTime(end))

    const newEvent = {
      ...event,
      start: s.toISOString(),
      end: e.toISOString(),
    }

    setEvent(newEvent)
    close()
  }, [event, start, end, setEvent, close])

  const invalid = useMemo(() => {
    const startDate = moment(event.start, true).toDate()
    const endDate = moment(event.end, true).toDate()
    return !isValidIntervalTime([startDate, endDate], start, end)
  }, [event.start, event.end, start, end])

  return (
    <S.Container>
      <div>
        <div>Configuração de Horário</div>
        <div>
          Configure se necessário o horário para as datas que não sejam de dias
          inteiros
        </div>
      </div>

      <MwScrollContainer before={<HeaderComponent />}>
        <MwGrid
          cols={{ spacing: 's3', spacingAround: true }}
          rows={{ striped: { odd: 'iceWhite' } }}
          borderless
        >
          <RowContent
            event={event}
            start={[start, setStart]}
            end={[end, setEnd]}
            invalid={invalid}
          />
        </MwGrid>
      </MwScrollContainer>

      <div>
        <MwButton
          type='button'
          size='large'
          appearance='borderless'
          onClick={close}
        >
          Cancelar
        </MwButton>
        <MwButton
          type='button'
          size='large'
          disabled={invalid}
          onClick={onSubmit}
        >
          Salvar
        </MwButton>
      </div>
    </S.Container>
  )
}

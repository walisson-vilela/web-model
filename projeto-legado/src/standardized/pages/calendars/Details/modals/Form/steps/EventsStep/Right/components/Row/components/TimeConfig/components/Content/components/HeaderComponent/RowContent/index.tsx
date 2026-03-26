import { useState } from 'react'

import { MwEllipsisContainer, MwGrid, MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'

import type { ReactState } from '../../../../../../../../../../../../../../types'
import { isAllDay } from '../../../../../../../../../../functions'
import type { Event } from '../../../../../../../../../../types'

const TimeInput = (props: {
  value: ReactState<string>
  disabled: boolean
  invalid: boolean
}) => {
  const {
    value: [value, setValue],
    disabled,
    invalid,
  } = props

  return (
    <MwGrid.Col
      align={{
        content: {
          horizontal: 'center',
          vertical: 'center',
        },
      }}
    >
      <div style={{ width: 66, margin: '-22.5px 0' }}>
        <MwInput
          type='time'
          setValue={setValue}
          value={value}
          disabled={disabled}
          invalid={invalid}
        />
      </div>
    </MwGrid.Col>
  )
}

export const RowContent = (props: {
  event: Event
  start: ReactState<string>
  end: ReactState<string>
  invalid: boolean
}) => {
  const {
    event,
    start: [start, setStart],
    end: [end, setEnd],
    invalid,
  } = props

  const [checked, setChecked] = useState(isAllDay(event))

  const resetEvent = (check: boolean) => {
    if (!check) return
    setStart('00:00')
    setEnd('23:59')
  }

  return (
    <MwGrid.Row>
      <MwGrid.Col
        width='4'
        align={{
          content: {
            horizontal: 'left',
            vertical: 'center',
          },
        }}
      >
        <MwEllipsisContainer>
          {moment(event.start).format('DD/MM/YYYY')} |{' '}
          <span
            style={{ textTransform: 'capitalize' }}
            children={
              new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
                .format(new Date(event.start))
                .split('-')[0]
            }
          />
        </MwEllipsisContainer>
      </MwGrid.Col>

      <MwGrid.Col
        align={{
          content: {
            horizontal: 'center',
            vertical: 'center',
          },
        }}
      >
        <MwInput
          type='checkbox'
          onChange={(e) => {
            setChecked(e.target.checked)
            resetEvent(e.target.checked)
          }}
          checked={checked}
        />
      </MwGrid.Col>

      <TimeInput
        value={[start, setStart]}
        disabled={checked}
        invalid={end.length === 5 && invalid}
      />

      <TimeInput
        value={[end, setEnd]}
        disabled={checked}
        invalid={start.length === 5 && invalid}
      />
    </MwGrid.Row>
  )
}

import React, { useContext } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../../context'

import * as S from './styles'

const weekdays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
] as const

const Days = () => {
  const {
    workDate: {
      state: [workDate, setWorkDate],
      isInvalid,
    },
  } = useContext(SystemAccessTimeContext)

  return (
    'days' in workDate && (
      <S.DaysContainer>
        <MwInput
          type='checkbox'
          label='Todos os Dias'
          onChange={(e) => {
            setWorkDate((prev) => {
              if (!('days' in prev)) return prev

              const days = e.target.checked
                ? [...weekdays.keys()].map((d) => d + 1)
                : []

              return { ...prev, days }
            })
          }}
          checked={workDate.days.length === weekdays.length}
          invalid={isInvalid('days')}
        />

        {weekdays.map((label, index) => {
          const weekday = index + 1

          return (
            <MwInput
              key={weekday}
              type='checkbox'
              label={label}
              onChange={(e) => {
                setWorkDate((prev) => {
                  if (!('days' in prev)) return prev

                  // removing the value from the list
                  let days = prev.days.filter((e) => e !== weekday)
                  // if it was checked, adds the value to the list
                  if (e.target.checked) days = [...days, weekday]
                  // sorting list
                  days = days.sort()

                  return { ...prev, days }
                })
              }}
              checked={workDate.days.includes(weekday)}
              value={weekday}
            />
          )
        })}
      </S.DaysContainer>
    )
  )
}

export default Days

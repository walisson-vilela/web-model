import React from 'react'

import { MwCalendar, MwIcon, MwScrollContainer } from '@mw-kit/mw-ui'
import { BasicCalendarProps } from '@mw-kit/mw-ui/dist/components/Calendar/interfaces'

import useContext from '../../contexts/Main'
import { useScrollMonth } from '../../hooks'

import { getMonths } from './functions'
import * as S from './styles'

const Calendars = () => {
  const {
    year: [year, setYear],
    month: [month],
    highlightDates: [highlightDates],
  } = useContext()

  return (
    <React.Fragment>
      <S.YearContainer>
        <MwIcon
          type='semantic'
          icon='caret left'
          color='#192338'
          width='14px'
          height='14px'
          onClick={() => setYear((prev) => prev - 1)}
        />

        {year}

        <MwIcon
          type='semantic'
          icon='caret right'
          color='#192338'
          width='14px'
          height='14px'
          onClick={() => setYear((prev) => prev + 1)}
        />
      </S.YearContainer>

      <MwScrollContainer style={{ scrollBehavior: 'smooth' }}>
        <S.Body ref={useScrollMonth(month || 0, 3, [])}>
          {getMonths(year, 3).map((group, index) => {
            return (
              <S.Row key={index}>
                {group.map((limits, index) => {
                  return (
                    <MwCalendar
                      key={index}
                      type='basic'
                      {...limits}
                      initialMonth={limits.min}
                      getDay={(day) => {
                        const highlightDate = highlightDates.find(
                          (e) =>
                            e.date.getFullYear() === day.getFullYear() &&
                            e.date.getMonth() === day.getMonth() &&
                            e.date.getDate() === day.getDate(),
                        )

                        const config: ReturnType<BasicCalendarProps['getDay']> =
                          highlightDate
                            ? {
                                appearance: 'active',
                                activeColor: highlightDate.color,
                              }
                            : {}

                        return config
                      }}
                      paddingless
                    />
                  )
                })}
              </S.Row>
            )
          })}
        </S.Body>
      </MwScrollContainer>
    </React.Fragment>
  )
}

export default Calendars

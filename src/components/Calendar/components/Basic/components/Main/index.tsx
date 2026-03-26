import React, { useEffect, useState } from 'react'

import { dateCompare } from '../../../../../../functions/validators'
import { useOnClickOut } from '../../../../../../hooks'
import { theme } from '../../../../../../theme'
import Icon from '../../../../../Icon'
import Loader from '../../../../../Loader'
import { months } from '../../../../constants'
import { getCalendar, getInitialCalendar } from '../../../../functions'
import MonthPicker from '../../components/MonthPicker'
import type { CalendarInterface } from '../../interfaces'

import type { MainProps } from './interfaces'
import * as S from './styles'

const Main = React.forwardRef(
  (props: MainProps, ref?: React.ForwardedRef<HTMLDivElement>) => {
    const { getDay, initialMonth } = props

    const [selectOpen, setSelectOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const onChangeMonth = (() => {
      const { onChangeMonth } = props

      if (!onChangeMonth) return async () => {}
      return (async (...args) => {
        setLoading(true)
        await onChangeMonth(...args)
        setLoading(false)
      }) as typeof onChangeMonth
    })()

    const min = props.min
      ? (() => {
          const date = new Date(props.min)
          date.setHours(0, 0, 0, 0)
          return date
        })()
      : undefined

    const max = props.max
      ? (() => {
          const date = new Date(props.max)
          date.setHours(0, 0, 0, 0)
          return date
        })()
      : undefined

    const [calendar, _setCalendar] =
      props.calendar ||
      useState<CalendarInterface>(getInitialCalendar(initialMonth, min, max))

    // se o novo calendario for igual ao anterior, nao altera o estado
    const setCalendar: typeof _setCalendar = (value) => {
      _setCalendar((prev) => {
        const newv = typeof value === 'function' ? value(prev) : value
        return newv.month === prev.month && newv.year === prev.year
          ? prev
          : newv
      })
    }

    const isControlled = props.calendar !== undefined

    useEffect(() => {
      if (isControlled) return
      // if client is controlling calendar state, it should not auto update
      setCalendar(getInitialCalendar(initialMonth, min, max))
    }, [
      isControlled,
      initialMonth?.toISOString(),
      min?.toISOString(),
      max?.toISOString(),
    ])

    useEffect(() => {
      const [first, last] = [
        calendar.weeks[0],
        calendar.weeks[calendar.weeks.length - 1],
      ]
      onChangeMonth({
        ...calendar,
        firstDay: first[0],
        lastDay: last[last.length - 1],
      })
    }, [calendar])

    const changeMonth = (add: 1 | -1) => {
      setCalendar((prev) => {
        const date = new Date()
        date.setDate(1)
        date.setFullYear(prev.year)
        date.setMonth(prev.month + add)

        return getCalendar(date)
      })
    }

    const getPrev = () => {
      const [disabled, onClick] =
        min !== undefined &&
        (calendar.year < min.getFullYear() ||
          (calendar.year === min.getFullYear() &&
            calendar.month <= min.getMonth()))
          ? [true]
          : [undefined, () => changeMonth(-1)]

      return (
        <S.NavBtn type='button' onClick={onClick} disabled={disabled}>
          <Icon
            type='feather'
            icon='chevron_left'
            color='darkBlue'
            strokeWidth='3px'
          />
        </S.NavBtn>
      )
    }

    const getNext = () => {
      const [disabled, onClick] =
        max !== undefined &&
        (calendar.year > max.getFullYear() ||
          (calendar.year === max.getFullYear() &&
            calendar.month >= max.getMonth()))
          ? [true]
          : [undefined, () => changeMonth(1)]

      return (
        <S.NavBtn type='button' onClick={onClick} disabled={disabled}>
          <Icon
            type='feather'
            icon='chevron_right'
            color='darkBlue'
            strokeWidth='3px'
          />
        </S.NavBtn>
      )
    }

    return (
      <S.Container ref={ref} $paddingless={props.paddingless}>
        {props.label && <S.LabelContainer>{props.label}</S.LabelContainer>}

        <S.CalendarContainer>
          <S.Header>
            <S.MonthContainer>
              {getPrev()}
              <div ref={useOnClickOut(() => setSelectOpen(false))}>
                {(() => {
                  if (
                    min !== undefined &&
                    max !== undefined &&
                    min.getFullYear() === max.getFullYear() &&
                    min.getMonth() === max.getMonth()
                  ) {
                    return (
                      <S.MonthName>
                        {months[calendar.month]} {calendar.year}
                      </S.MonthName>
                    )
                  }

                  return (
                    <S.MonthBtn onClick={() => setSelectOpen((prev) => !prev)}>
                      <S.MonthName>
                        {months[calendar.month]} {calendar.year}
                      </S.MonthName>
                      <Icon
                        type='feather'
                        icon={selectOpen ? 'chevron_up' : 'chevron_down'}
                        width='14px'
                      />
                    </S.MonthBtn>
                  )
                })()}

                <MonthPicker
                  open={selectOpen}
                  close={() => setSelectOpen(false)}
                  year={calendar.year}
                  setValue={(year, month) => {
                    const date = new Date()
                    date.setDate(1)
                    date.setFullYear(year)
                    date.setMonth(month)
                    setCalendar(getCalendar(date))
                  }}
                  min={min}
                  max={max}
                  width='100%'
                  maxHeight='180px'
                  transition={{ properties: { 'max-height': {} } }}
                  itemSpacing='s3'
                  bordered
                />
              </div>
              {getNext()}
            </S.MonthContainer>

            <S.WeekContainer>
              <div>D</div>
              <div>S</div>
              <div>T</div>
              <div>Q</div>
              <div>Q</div>
              <div>S</div>
              <div>S</div>
            </S.WeekContainer>
          </S.Header>

          {calendar.weeks.map((week, index) => {
            return (
              <S.WeekContainer key={index}>
                {week.map((date, index) => {
                  const details = getDay(date)

                  const day = date.getDate()
                  const month = date.getMonth()

                  const appearance =
                    month !== calendar.month ||
                    (max && date > max) ||
                    (min && date < min)
                      ? 'disabled'
                      : details.appearance

                  const [disabled, onClick, onMouseOver, onMouseOut] =
                    appearance === 'disabled'
                      ? [true, undefined]
                      : [
                          undefined,
                          details.onClick,
                          details.onMouseOver,
                          details.onMouseOut,
                        ]

                  return (
                    <S.DayContainer
                      key={index}
                      type='button'
                      onClick={onClick}
                      onMouseOver={onMouseOver}
                      onMouseOut={onMouseOut}
                      disabled={disabled}
                      $appearance={appearance}
                      $activeColor={details.activeColor || 'blue'}
                      $today={
                        dateCompare(new Date(), date, 'eq', false) ? 1 : 0
                      }
                    >
                      {day}
                      {details.indicator && (
                        <S.DayIndicator type={details.indicator} />
                      )}
                    </S.DayContainer>
                  )
                })}
              </S.WeekContainer>
            )
          })}
        </S.CalendarContainer>

        {(() => {
          if (!props.children) {
            return null
          }
          if (Array.isArray(props.children) && !props.children.some((e) => e)) {
            return null
          }
          return <S.Footer>{props.children}</S.Footer>
        })()}

        {loading && <Loader filled={theme.getColor('white', 95)} />}
      </S.Container>
    )
  },
)

Main.displayName = 'Main'

export default Main

import React, { useEffect, useState } from 'react'

import {
  dateToIsoString,
  filterObject,
} from '../../../../../../functions/formatters'
import { dateCompare } from '../../../../../../functions/validators'
import type { ButtonProps } from '../../../../../Button/interfaces'
import Input from '../../../../../Input/components/Time'
import { inputTimeWidth } from '../../../../constants'
import {
  getCalendar,
  getFullDate,
  getInitialCalendar,
  getTimeFromDate,
  isDateBetween,
  isInvalid,
} from '../../../../functions'
import BasicCalendar from '../../../Basic'
import type { CalendarInterface } from '../../../Basic/interfaces'
import type { BasicCalendarProps } from '../../../interfaces'
import type { Value } from '../../interfaces'

import { getCalendar2, getTimeProps, getValue } from './functions'
import type { MainProps } from './interfaces'
import * as S from './styles'

const Main = React.forwardRef(
  (props: MainProps, ref?: React.ForwardedRef<HTMLDivElement>) => {
    const { initialMonth, initialValue, min, max } = props

    const [value, setValue] =
      props.value || useState<Value>(getValue(initialValue || [], min, max))

    const [invalid, setInvalid] =
      props.invalid || useState<[boolean, boolean]>([false, false])

    const [time, setTime] = useState<[string, string]>(() => {
      return value.map(getTimeFromDate) as [string, string]
    })

    const [calendar1, _setCalendar1] = useState<CalendarInterface>(() => {
      const calendar1 = getInitialCalendar(value[0] || initialMonth, min, max)
      return calendar1
    })

    // se o novo calendario for igual ao anterior, nao altera o estado
    const setCalendar1: typeof _setCalendar1 = (value) => {
      _setCalendar1((prev) => {
        const newv = typeof value === 'function' ? value(prev) : value
        return newv.month === prev.month && newv.year === prev.year
          ? prev
          : newv
      })
    }

    const [calendar2, _setCalendar2] = useState<CalendarInterface>(() => {
      const calendar2 = getCalendar2(calendar1)
      return calendar2
    })

    // se o novo calendario for igual ao anterior, nao altera o estado
    const setCalendar2: typeof _setCalendar2 = (value) => {
      _setCalendar2((prev) => {
        const newv = typeof value === 'function' ? value(prev) : value
        return newv.month === prev.month && newv.year === prev.year
          ? prev
          : newv
      })
    }

    const [hoverDay, setHoverDay] = useState<Date | null>(null)

    useEffect(() => {
      // if client is controlling calendar state, it should not auto update
      const calendar1 = getInitialCalendar(value[0] || initialMonth, min, max)
      const calendar2 = getCalendar2(calendar1)
      setCalendar1(calendar1)
      setCalendar2(calendar2)
    }, [initialMonth?.toISOString(), min?.toISOString(), max?.toISOString()])

    useEffect(() => {
      const timeProps = getTimeProps(props.time, value)

      setHoverDay(null)

      if (value[0]) {
        const c1 = getCalendar(value[0])
        const c2 = (() => {
          const c2 = getCalendar2(c1)
          if (value[1]) {
            const c2 = getCalendar(value[1])
            if (
              c2.year > c1.year ||
              (c2.year === c1.year && c2.month > c1.month)
            ) {
              return c2
            }
          }

          return c2
        })()

        setCalendar1(c1)
        setCalendar2(c2)
      }

      setInvalid(
        value.map((v, i): boolean => {
          return isInvalid(v, time[i], timeProps[i], min, max)
        }) as [boolean, boolean],
      )
    }, [value, time, props.time])

    const _getDay: Exclude<typeof props.getDay, undefined> =
      props.getDay || (() => ({}))

    const getDay = (day: Date, side: 'left' | 'right') => {
      const dayProps = _getDay(day, side)

      const onClick = () => {
        const newValue: Value = [...value]
        if (!newValue[0]) {
          newValue[0] = new Date(day)
        } else if (newValue[1]) {
          newValue[0] = new Date(day)
          newValue[1] = null
        } else if (dateCompare(day, newValue[0], 'lt')) {
          newValue[1] = newValue[0]
          newValue[0] = new Date(day)
        } else {
          newValue[1] = new Date(day)
        }

        setValue(newValue)
      }

      const [onMouseOver, onMouseOut] =
        value[0] && !value[1]
          ? [() => setHoverDay(day), () => setHoverDay(null)]
          : [() => {}, () => {}]

      const appearance = (() => {
        if (value.some((v) => v && dateCompare(v, day, 'eq', false))) {
          return 'active'
        }

        if (
          (value[0] && value[1] && isDateBetween(day, value[0], value[1])) ||
          (value[0] &&
            hoverDay &&
            (isDateBetween(day, value[0], hoverDay) ||
              isDateBetween(day, hoverDay, value[0])))
        ) {
          return 'highlight'
        }

        return undefined
      })()

      const [_onClick, _onMouseOver, _onMouseOut] = (
        ['onClick', 'onMouseOver', 'onMouseOut'] as const
      ).map((c) => dayProps[c] || (() => {}))

      return {
        ...dayProps,
        appearance: appearance || dayProps.appearance,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          _onClick(e)
          onClick()
        },
        onMouseOver: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          _onMouseOver(e)
          onMouseOver()
        },
        onMouseOut: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          _onMouseOut(e)
          onMouseOut()
        },
      }
    }

    const calendarProps = filterObject<MainProps, BasicCalendarProps>(props, [
      'initialValue',
      'value',
      'time',
      'onSubmit',
      'invalid',
      'initialMonth',
      'max',
      'min',
      'getDay',
    ])

    const timeInvalid = !time.some((t) => t.length > 0)
      ? [false, false]
      : time.map((t) => t.length === 0)

    const submitProps: ButtonProps | undefined = !props.onSubmit
      ? undefined
      : (() => {
          const disabled =
            props.onSubmit.disabled ||
            value.some((v) => v === null) ||
            invalid.some((v) => v) ||
            timeInvalid.some((v) => v)

          const { onClick } = props.onSubmit

          return {
            ...props.onSubmit,
            disabled,
            onClick: disabled
              ? undefined
              : () => {
                  onClick([
                    value[0] ? getFullDate(value[0], time[0]) : null,
                    value[1] ? getFullDate(value[1], time[1], true) : null,
                  ])
                },
          }
        })()

    const middle = [new Date(), new Date()] as const
    middle[0].setDate(1)
    middle[0].setFullYear(calendar2.year)
    middle[0].setMonth(calendar2.month)
    middle[0].setDate(0)
    middle[0].setHours(23, 59, 59, 999)

    middle[1].setDate(1)
    middle[1].setFullYear(calendar1.year)
    middle[1].setMonth(calendar1.month + 1)
    middle[1].setHours(0, 0, 0, 0)

    const inputs = getTimeProps(props.time, value).map((timeProps, index) => {
      if (!timeProps) return undefined

      const width = timeProps.seconds ? 'withSeconds' : 'withoutSeconds'

      return (
        <Input
          key={index}
          {...timeProps}
          type='time'
          value={time[index]}
          setValue={(v) =>
            setTime((prev) => {
              const n = [...prev]
              n[index] = v
              return n as [string, string]
            })
          }
          invalid={
            (value[index] !== null && invalid[index]) || timeInvalid[index]
          }
          width={inputTimeWidth[width]}
        />
      )
    })

    const onChangeMonth = props.onChangeMonth || (async () => {})

    return (
      <S.CalendarsContainer>
        <BasicCalendar
          {...calendarProps}
          getDay={(c) => getDay(c, 'left')}
          onChangeMonth={async (c) => await onChangeMonth(c, 'left')}
          ref={ref}
          label={
            <S.LabelContainer>
              <b>Inicio:</b>{' '}
              {value[0] ? dateToIsoString(value[0]) : '––/––/––––'}
            </S.LabelContainer>
          }
          calendar={[
            calendar1,
            (v) => {
              setCalendar1((prev) => {
                const c1 = typeof v === 'function' ? v(prev) : v
                setCalendar2((prev) => {
                  if (prev.year > c1.year) return prev
                  if (prev.year === c1.year && prev.month > c1.month) {
                    return prev
                  }
                  return getCalendar2(c1)
                })
                return c1
              })
            },
          ]}
          min={min}
          max={max && dateCompare(max, middle[0], 'lt') ? max : middle[0]}
        >
          {inputs[0]}
        </BasicCalendar>

        <BasicCalendar
          {...calendarProps}
          getDay={(c) => getDay(c, 'right')}
          onChangeMonth={async (c) => await onChangeMonth(c, 'right')}
          ref={ref}
          label={
            <S.LabelContainer>
              <b>Fim:</b> {value[1] ? dateToIsoString(value[1]) : '––/––/––––'}
            </S.LabelContainer>
          }
          calendar={[calendar2, setCalendar2]}
          min={min && dateCompare(min, middle[1], 'gt') ? min : middle[1]}
          max={max}
        >
          {inputs[1]}

          {submitProps && (
            <S.SubmitButton content='Aplicar' {...submitProps} type='button' />
          )}
        </BasicCalendar>
      </S.CalendarsContainer>
    )
  },
)

Main.displayName = 'Main'

export default Main

import React, { useEffect, useState } from 'react'

import { filterObject } from '../../../../../../functions/formatters'
import { dateCompare } from '../../../../../../functions/validators'
import Input from '../../../../../Input/components/Time'
import { inputTimeWidth } from '../../../../constants'
import {
  getFullDate,
  getTimeFromDate,
  isDateBetween,
  isInvalid,
} from '../../../../functions'
import * as S from '../../../../styles'
import BasicCalendar from '../../../Basic'
import type { BasicCalendarProps } from '../../../Basic/interfaces'

import type { MainProps } from './interfaces'

const SingleCalendar = React.forwardRef(
  (props: MainProps, ref?: React.ForwardedRef<HTMLDivElement>) => {
    const { initialValue, min, max } = props

    const [value, setValue] =
      props.value ||
      useState<Date | null>(
        initialValue &&
          !isNaN(initialValue.getTime()) &&
          isDateBetween(initialValue, min, max)
          ? initialValue
          : null,
      )

    const timeProps = (() => {
      if (props.time === true) return {}
      if (typeof props.time === 'function') return props.time(value)
      return props.time
    })()

    const [invalid, setInvalid] = props.invalid || useState<boolean>(false)

    const [time, setTime] = useState<string>(getTimeFromDate(value))

    useEffect(() => {
      setInvalid(isInvalid(value, time, timeProps, min, max))
    }, [value, time, timeProps])

    const _getDay: Exclude<typeof props.getDay, undefined> =
      props.getDay || (() => ({}))

    const getDay: BasicCalendarProps['getDay'] = (day: Date) => {
      const dayProps = _getDay(day)

      const active = value && dateCompare(value, day, 'eq', false)

      const _onClick = dayProps.onClick || (() => {})

      const onClick = active
        ? () => setValue(null)
        : () => setValue(new Date(day))

      return {
        ...dayProps,
        appearance: active ? 'active' : dayProps.appearance,
        onClick: (e) => {
          _onClick(e)
          onClick()
        },
      }
    }

    const calendarProps = filterObject<MainProps, BasicCalendarProps>(props, [
      'value',
      'time',
      'onSubmit',
      'invalid',
      'getDay',
    ])

    const onSubmit = {
      disabled: value === null || invalid,
      onClick: () => {},
    }

    if (props.onSubmit) {
      const { disabled, onClick } = props.onSubmit

      if (disabled) {
        onSubmit.disabled = true
      }

      onSubmit.onClick = () => {
        onClick(value ? getFullDate(value, time) : null)
      }
    }

    return (
      <BasicCalendar
        {...calendarProps}
        {...{ getDay }}
        ref={ref}
        initialMonth={props.initialValue || props.initialMonth}
      >
        {timeProps && (
          <Input
            {...timeProps}
            type='time'
            value={time}
            setValue={setTime}
            invalid={value !== null && invalid}
            width={
              inputTimeWidth[
                timeProps.seconds ? 'withSeconds' : 'withoutSeconds'
              ]
            }
          />
        )}

        {props.onSubmit && (
          <S.SubmitButton {...onSubmit} type='button' content='Aplicar' />
        )}
      </BasicCalendar>
    )
  },
)

SingleCalendar.displayName = 'SingleCalendar'

export default SingleCalendar

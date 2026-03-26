import React, { useEffect, useState } from 'react'

import { dateToIsoString, filterObject } from '../../../../functions/formatters'
import { isDateInstance } from '../../../../functions/validators'
import { useOnClickOut } from '../../../../hooks'
import Calendar from '../../../Calendar'
import { getMiddle } from '../../../Calendar/functions'
import Icon from '../../../Icon'
import Menu from '../../../Menu'

import { identify, intervalTypes, parse, validate } from './functions'
import type { DateIntervalPickerProps, IntervalType } from './interfaces'
import * as S from './styles'

const Component = React.forwardRef(
  (
    props: DateIntervalPickerProps,
    ref?: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const center = props.center || { x: 50, y: 50 }
    const value = parse(props.value)

    const [open, setOpen] = useState<'menu' | 'calendar' | null>(null)
    const [intervalType, setIntervalType] = useState<IntervalType>(
      props.only || 'day',
    )

    const config = intervalTypes[intervalType]
    const { min, max } = config.getMinMax
      ? config.getMinMax(props.min, props.max)
      : props

    const setValue = (newValue: [Date, Date]) => {
      const parsed = newValue.map((v) =>
        dateToIsoString(v, true, true, 'us'),
      ) as [string, string]

      props.setValue(parsed)
    }

    useEffect(() => {
      if (props.min && props.max && props.min > props.max) {
        throw Error('Min prop must be less than Max')
      }

      if (props.only) {
        return
      }

      const value = parse(props.value)
      if (
        value.some((v) => !isDateInstance(v)) ||
        !validate(value, props.min, props.max)
      ) {
        return
      }

      const newIntervalType = identify(value)
      setIntervalType(newIntervalType)
    }, [props.value, props.min, props.max])

    const inputProps = filterObject<
      DateIntervalPickerProps,
      React.HtmlHTMLAttributes<HTMLInputElement>
    >(props, [
      'label',
      'invalid',
      'required',
      'disabled',
      'width',
      'borderless',
      'paddingless',
      'type',
      'value',
      'setValue',
      'getLabel',
      'max',
      'min',
      'only',
      'calendar',
    ])

    const getArrowProps = (key: 'increment' | 'decrement') => {
      if (value.some((v) => !isDateInstance(v))) {
        return {
          disabled: true,
        }
      }

      const func = config[key]

      if (func === undefined) {
        return {
          disabled: true,
        }
      }
      const nextValue = func(value as [Date, Date])
      if (!validate(nextValue, min, max)) {
        return {
          disabled: true,
        }
      }
      return {
        onClick: () => setValue(nextValue),
      }
    }

    const invalid = props.invalid || !validate(value, min, max)

    const onClick = (() => {
      if (props.disabled || !['custom', undefined].includes(props.only)) {
        return undefined
      }

      const toOpen = props.only === 'custom' ? 'calendar' : 'menu'
      return () => setOpen((prev) => (prev === null ? toOpen : null))
    })()

    const input = <input {...inputProps} type='text' ref={ref} readOnly />

    return (
      <S.RelativeContainer
        ref={useOnClickOut(() => setOpen(null))}
        $invalid={invalid}
      >
        {props.label ? (
          <S.LabelText $required={props.required}>
            {props.label}
            {input}
          </S.LabelText>
        ) : (
          input
        )}

        <S.Container
          $invalid={props.invalid}
          $disabled={props.disabled}
          $paddingless={props.paddingless}
          $borderless={props.borderless}
        >
          {(() => {
            const label = (
              <S.LabelContainer onClick={onClick}>
                {!value.some((v) => !isDateInstance(v)) &&
                  config.label(value as [Date, Date])}
              </S.LabelContainer>
            )

            if (intervalType === 'custom') return label

            const incrementProps = getArrowProps('increment')
            const decrementProps = getArrowProps('decrement')

            return (
              <React.Fragment>
                <S.Button
                  type='button'
                  {...decrementProps}
                  disabled={props.disabled || decrementProps.disabled}
                  tabIndex={-1}
                >
                  <Icon
                    type='feather'
                    icon='chevron_left'
                    color={props.invalid ? 'warningRed' : 'grey'}
                    strokeWidth='3px'
                  />
                </S.Button>

                {label}

                <S.Button
                  type='button'
                  {...incrementProps}
                  disabled={props.disabled || incrementProps.disabled}
                  tabIndex={-1}
                >
                  <Icon
                    type='feather'
                    icon='chevron_right'
                    color={props.invalid ? 'warningRed' : 'grey'}
                    strokeWidth='3px'
                  />
                </S.Button>
              </React.Fragment>
            )
          })()}

          <S.Button type='button' onClick={onClick} tabIndex={-1}>
            <Icon
              type='feather'
              icon='calendar'
              color={props.invalid ? 'warningRed' : 'grey'}
              width='16px'
              height='16px'
            />
          </S.Button>
        </S.Container>

        <Menu
          open={open === 'menu'}
          close={() => setOpen(null)}
          center={center}
          references={{ bottom: '35px' }}
          options={[
            {
              label: 'Hoje',
              onClick: () => setValue(intervalTypes.day.initial(props.min)),
              data: {},
            },
            {
              label: 'Semana',
              onClick: () => setValue(intervalTypes.week.initial(props.min)),
              data: {},
            },
            {
              label: 'Mês',
              onClick: () => setValue(intervalTypes.month.initial(props.min)),
              data: {},
            },
            {
              label: 'Personalizado',
              onClick: () => setOpen('calendar'),
              data: {},
              keepOpen: true,
              caret: true,
            },
          ]}
          width='165px'
          itemSpacing='s3'
          bordered
        />

        <Calendar
          {...(props.calendar || {})}
          center={center}
          type='interval'
          absolute
          open={open === 'calendar'}
          initialValue={value}
          onSubmit={{
            onClick: ([start, end]) => {
              if (start === null || end === null) return
              setValue([start, end])
              setOpen(null)
            },
          }}
          min={props.min}
          max={props.max}
          references={{ bottom: '35px' }}
        />
      </S.RelativeContainer>
    )
  },
)

Component.displayName = 'DatePicker'

const useDefaultDateIntervalState = (min?: Date, max?: Date) => {
  const middle = getMiddle(min, max)

  const start = new Date(middle)
  start.setHours(0, 0, 0, 0)
  const end = new Date(middle)
  end.setHours(23, 59, 59, 999)

  return [start.toISOString(), end.toISOString()] as [string, string]
}

const DatePicker = Object.assign(Component, {
  useDefaultDateIntervalState,
})

export default DatePicker

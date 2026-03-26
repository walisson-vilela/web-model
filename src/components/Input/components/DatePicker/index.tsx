import React, { useEffect, useState } from 'react'

import {
  dateToIsoString,
  filterObject,
  isoStringToDate,
} from '../../../../functions/formatters'
import { useOnClickOut } from '../../../../hooks'
import Calendar from '../../../Calendar'
import { getMiddle } from '../../../Calendar/functions'
import Icon from '../../../Icon'
import Input from '../Input'
import type { InputProps } from '../Input/interfaces'

import type { DatePickerProps } from './interfaces'
import * as S from './styles'

const DatePicker = React.forwardRef(
  (props: DatePickerProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { picker, value, setValue, min, max } = props

    const disabled = props.disabled || props.loading

    const today = dateToIsoString(new Date())

    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
      const date = isoStringToDate(value)
      if (!date) {
        setValue(dateToIsoString(getMiddle(min, max)))
      }
    }, [value])

    const onAdd = () => {
      const date = isoStringToDate(value) || new Date()
      date.setDate(date.getDate() + 1)
      if (max && date > max) return
      setValue(dateToIsoString(date))
    }

    const onSub = () => {
      const date = isoStringToDate(value) || new Date()
      date.setDate(date.getDate() - 1)
      if (min && date < min) return
      setValue(dateToIsoString(date))
    }

    const icon: InputProps['icon'] = picker
      ? {
          icon: {
            type: 'feather',
            icon: 'calendar',
            width: '16px',
            height: '16px',
            onClick: () => setOpen((prev) => !prev),
          },
          position: 'right',
        }
      : undefined

    const inputProps = filterObject<DatePickerProps, InputProps>(props, [
      'picker',
      'min',
      'max',
    ])

    return (
      <S.RelativeContainer ref={useOnClickOut(() => setOpen(false))}>
        <Input {...inputProps} type='text' icon={icon} ref={ref} htmlDisabled />

        <S.Container
          $iconWidth={picker ? '24px' : '0px'}
          $invalid={props.invalid}
          $disabled={props.disabled}
          $paddingless={props.paddingless}
        >
          <S.Button
            type='button'
            onClick={disabled ? undefined : onSub}
            tabIndex={-1}
            disabled={
              disabled ||
              (() => {
                if (!min) return undefined
                const v = isoStringToDate(value)
                if (!v) return undefined

                return v <= min
              })()
            }
          >
            <Icon
              type='feather'
              icon='chevron_left'
              color={props.invalid ? 'warningRed' : 'grey'}
              strokeWidth='3px'
            />
          </S.Button>

          <S.LabelContainer>
            {today === value ? 'Hoje' : value}
          </S.LabelContainer>

          <S.Button
            type='button'
            onClick={disabled ? undefined : onAdd}
            tabIndex={-1}
            disabled={
              disabled ||
              (() => {
                if (!max) return undefined
                const v = isoStringToDate(value)
                if (!v) return undefined

                return v >= max
              })()
            }
          >
            <Icon
              type='feather'
              icon='chevron_right'
              color={props.invalid ? 'warningRed' : 'grey'}
              strokeWidth='3px'
            />
          </S.Button>
        </S.Container>

        <Calendar
          {...(typeof picker === 'object' ? picker : {})}
          type='single'
          absolute
          open={open}
          initialValue={value ? isoStringToDate(value) : undefined}
          onSubmit={{
            onClick: (date) => {
              if (!date) return
              setValue(dateToIsoString(date))
              setOpen(false)
            },
          }}
          min={min}
          max={max}
          references={{ bottom: '35px' }}
        />
      </S.RelativeContainer>
    )
  },
)

DatePicker.displayName = 'DatePicker'

export default DatePicker

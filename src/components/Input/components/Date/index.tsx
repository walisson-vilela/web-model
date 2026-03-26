import React, { useState } from 'react'

import {
  dateToIsoString,
  filterObject,
  isoStringToDate,
} from '../../../../functions/formatters'
import { useOnClickOut } from '../../../../hooks'
import Calendar from '../../../Calendar'
import Input from '../Input'
import type { InputProps } from '../Input/interfaces'

import { JSDate } from './functions'
import type { DateProps } from './interfaces'
import * as S from './styles'

const isLeapYear = (year: number): boolean => {
  if (year % 4 !== 0) return false
  else if (year % 100 !== 0) return true
  else if (year % 400 !== 0) return false
  else return true
}

const mask = (v: string) => {
  v = v.replace(/[^0-9\s]/g, '')

  while (v.length > 0 && parseInt(v[0]) > 3) {
    v = v.substring(1)
  }

  if (v.length > 1) {
    if (v[0] === '3') {
      while (v.length > 1 && parseInt(v[1]) > 1) {
        v = v[0] + v.substring(2)
      }
    }
  }

  if (v.length > 2) {
    while (v.length > 2 && parseInt(v[2]) > 1) {
      v = v.substring(0, 2) + v.substring(3)
    }
  }

  if (v.length > 3) {
    if (v[2] === '1') {
      while (v.length > 3 && parseInt(v[3]) > 2) {
        v = v.substring(0, 3) + v.substring(4)
      }
    }
  }

  v = v.substring(0, 8)

  const date = [v.substring(0, 2), v.substring(2, 4), v.substring(4)]

  if (date[1] === '02') {
    const d = parseInt(date[0])

    if (date[2].length < 4 || isLeapYear(parseInt(date[2]))) {
      // se for ano nao estiver setado, ou se for bissexto, o dia maximo de fevereiro deve ser 29
      if (d > 29) {
        date[0] = '29'
      }
    } else if (d > 28) {
      // se for ano estiver setado e nao for bissexto, o dia maximo de fevereiro deve ser 28
      date[0] = '28'
    }
  } else if (['04', '06', '09', '11'].includes(date[1]) && date[0] === '31') {
    // meses com 30 dias
    date[0] = '30'
  }

  v = date.join('')

  if (v.length < 3) return v
  else if (v.length < 5) return v.substring(0, 2) + '/' + v.substring(2)
  else return v.substring(0, 2) + '/' + v.substring(2, 4) + '/' + v.substring(4)
}

const Date = React.forwardRef(
  (props: DateProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { picker, value, min, max } = props

    const setValue = props.setValue || (() => {})

    const [open, setOpen] = useState<boolean>(false)

    const _onKeyDown = props.onKeyDown || (() => {})

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      const target = event.target as HTMLInputElement

      const todayDate = new JSDate()

      const curD = todayDate.getDate()
      const curM = todayDate.getMonth() + 1
      const curY = todayDate.getFullYear()

      const value = target.value.replace(/[^0-9\s]/g, '')

      let tmp = value.substring(0, 2)
      const d = tmp.length === 0 ? curD : parseInt(tmp.padEnd(2, '0'))

      tmp = value.substring(2, 4)
      const m = tmp.length === 0 ? curM : parseInt(tmp.padEnd(2, '0'))

      tmp = value.substring(4, 8)
      const y = tmp.length === 0 ? curY : parseInt(tmp.padEnd(2, '0'))

      if (event.key === 'ArrowUp') {
        const date = new JSDate(`${y}-${m}-${d} 00:00:00`)
        date.setDate(date.getDate() + 1)

        if (!max || date <= max) {
          setValue(dateToIsoString(date))
        }
      } else if (event.key === 'ArrowDown') {
        const date = new JSDate(`${y}-${m}-${d} 00:00:00`)
        date.setDate(date.getDate() - 1)

        if (!min || date >= min) {
          setValue(dateToIsoString(date))
        }
      }

      _onKeyDown(event)
    }

    const placeholder =
      props.placeholder === undefined ? 'dd/mm/aaaa' : props.placeholder

    const icon: InputProps['icon'] = picker
      ? {
          icon: {
            type: 'feather',
            icon: 'calendar',
            onClick: () => setOpen((prev) => !prev),
          },
          position: 'right',
        }
      : undefined

    const inputProps = filterObject<DateProps, InputProps>(props, [
      'picker',
      'min',
      'max',
    ])

    return (
      <S.RelativeContainer ref={useOnClickOut(() => setOpen(false))}>
        <Input
          {...inputProps}
          type='text'
          placeholder={placeholder}
          mask={mask}
          onKeyDown={onKeyDown}
          icon={icon}
          ref={ref}
        />

        <Calendar
          {...(typeof picker === 'object' ? picker : {})}
          type='single'
          absolute
          open={open}
          initialValue={value ? isoStringToDate(value) : undefined}
          onSubmit={{
            onClick: (date) => {
              if (!date) return
              const newValue = dateToIsoString(date)
              setValue(newValue)
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

Date.displayName = 'Date'

export default Date

import React, { useState } from 'react'

import {
  dateToIsoString,
  filterObject,
  isoStringToDate,
  keys,
} from '../../../../functions/formatters'
import { useOnClickOut } from '../../../../hooks'
import Calendar from '../../../Calendar'
import Input from '../Input'
import type { InputProps } from '../Input/interfaces'

import type { DateTimeProps } from './interfaces'
import * as S from './styles'

const isLeapYear = (year: number): boolean => {
  if (year % 4 !== 0) return false
  else if (year % 100 !== 0) return true
  else if (year % 400 !== 0) return false
  else return true
}

const mask = (v: string, seconds?: boolean) => {
  v = v.replace(/\D+/g, '')

  // remove o primeiro digito enquanto ele for maior que 3, (nao existe dia maior que 31)
  while (v.length > 0 && parseInt(v[0]) > 3) {
    v = v.substring(1)
  }

  // se o primeiro digito for 3, remove o segundo digito enquanto ele for maior que 1, (nao existe dia maior que 31)
  if (v.length > 1) {
    if (v[0] === '3') {
      while (v.length > 1 && parseInt(v[1]) > 1) {
        v = v[0] + v.substring(2)
      }
    }
  }

  // remove o terceiro digito enquanto ele for maior que 1, (nao existe mes maior que 12)
  if (v.length > 2) {
    while (v.length > 2 && parseInt(v[2]) > 1) {
      v = v.substring(0, 2) + v.substring(3)
    }
  }

  // se o terceiro digito for 1, remove o quarto digito enquanto ele for maior que 2, (nao existe mes maior que 12)
  if (v.length > 3) {
    if (v[2] === '1') {
      while (v.length > 3 && parseInt(v[3]) > 2) {
        v = v.substring(0, 3) + v.substring(4)
      }
    }
  }

  // remove o nono digito enquanto ele for maior que 2, (nao existe hora maior que 23)
  if (v.length > 8) {
    while (v.length > 8 && parseInt(v[8]) > 2) {
      v = v.substring(0, 8) + v.substring(9)
    }
  }

  // se o nono digito for 2, remove o decimo digito enquanto ele for maior que 3, (nao existe hora maior que 23)
  if (v.length > 9) {
    if (v[8] === '2') {
      while (v.length > 9 && parseInt(v[9]) > 3) {
        v = v.substring(0, 9) + v.substring(10)
      }
    }
  }

  // remove o decimo primeiro digito enquanto ele for maior que 5, (nao existe minuto maior que 59)
  if (v.length > 10) {
    while (v.length > 10 && parseInt(v[10]) > 5) {
      v = v.substring(0, 10) + v.substring(11)
    }
  }

  // remove o decimo terceiro digito enquanto ele for maior que 5, (nao existe segundo maior que 59)
  if (v.length > 12) {
    while (v.length > 12 && parseInt(v[12]) > 5) {
      v = v.substring(0, 12) + v.substring(13)
    }
  }

  const date = [
    v.substring(0, 2),
    v.substring(2, 4),
    v.substring(4, 8),
    v.substring(8, 10),
    v.substring(10, 12),
    v.substring(12, 14),
  ]

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

  v = v.replace(
    /^((\d{0,2}))((\d{0,2}))((\d{0,4}))((\d{0,2}))((\d{0,2}))((\d{0,2}))$/g,
    '$1/$3/$5 $7:$9:$11',
  )

  while (v.length > 0 && !v[v.length - 1].match(/^\d$/g)) {
    v = v.substring(0, v.length - 1)
  }

  if (!seconds) {
    v = v.substring(0, 16)
  }

  return v
}

const getValueThroughDate = (date: Date, seconds?: boolean) => {
  const newValue = dateToIsoString(date, true)
  return !seconds ? newValue.substring(0, newValue.length - 3) : newValue
}

const steps = {
  year: {
    increment: (value: Date) => {
      value.setFullYear(value.getFullYear() + 1)
      return value
    },
    decrement: (value: Date) => {
      value.setFullYear(value.getFullYear() - 1)
      return value
    },
  },
  month: {
    increment: (value: Date) => {
      value.setMonth(value.getMonth() + 1)
      return value
    },
    decrement: (value: Date) => {
      value.setMonth(value.getMonth() - 1)
      return value
    },
  },
  day: {
    increment: (value: Date) => {
      value.setDate(value.getDate() + 1)
      return value
    },
    decrement: (value: Date) => {
      value.setDate(value.getDate() - 1)
      return value
    },
  },
  hour: {
    increment: (value: Date) => {
      value.setHours(value.getHours() + 1)
      return value
    },
    decrement: (value: Date) => {
      value.setHours(value.getHours() - 1)
      return value
    },
  },
  minute: {
    increment: (value: Date) => {
      value.setMinutes(value.getMinutes() + 1)
      return value
    },
    decrement: (value: Date) => {
      value.setMinutes(value.getMinutes() - 1)
      return value
    },
  },
  second: {
    increment: (value: Date) => {
      value.setSeconds(value.getSeconds() + 1)
      return value
    },
    decrement: (value: Date) => {
      value.setSeconds(value.getSeconds() - 1)
      return value
    },
  },
}

const DateTime = React.forwardRef(
  (props: DateTimeProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { picker, value, min, max } = props

    const step = steps[props.step || 'day']

    const setValue = props.setValue || (() => {})

    const [open, setOpen] = useState<boolean>(false)

    const _onKeyDown = props.onKeyDown || (() => {})

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      const target = event.target as HTMLInputElement

      const todayDate = new Date()

      const cur = {
        day: {
          start: 0,
          end: 2,
          value: todayDate.getDate(),
        },
        month: {
          start: 2,
          end: 4,
          value: todayDate.getMonth() + 1,
        },
        year: {
          start: 4,
          end: 8,
          value: todayDate.getFullYear(),
        },
        hours: {
          start: 8,
          end: 10,
          value: todayDate.getHours(),
        },
        minutes: {
          start: 10,
          end: 12,
          value: todayDate.getMinutes(),
        },
        seconds: {
          start: 12,
          end: 14,
          value: todayDate.getSeconds(),
        },
      }

      const value = target.value.replace(/\D+/g, '')

      const v = keys(cur).reduce((prev, k) => {
        const { start, end, value: current } = cur[k]
        const len = end - start

        const tmp = value.substring(start, end)

        return {
          ...prev,
          [k]: tmp.length === 0 ? current : parseInt(tmp.padEnd(len, '0')),
        }
      }, {} as { [key in keyof typeof cur]: number })

      let date = new Date(
        `${v.year}-${v.month}-${v.day} ${v.hours}:${v.minutes}:${v.seconds}`,
      )

      if (event.key === 'ArrowUp') {
        date = step.increment(date)
        if (!max || date <= max) {
          setValue(getValueThroughDate(date, props.seconds))
        }
      } else if (event.key === 'ArrowDown') {
        date = step.decrement(date)
        if (!min || date >= min) {
          setValue(getValueThroughDate(date, props.seconds))
        }
      }

      _onKeyDown(event)
    }

    const placeholder =
      props.placeholder === undefined
        ? 'dd/mm/aaaa hh:mm:ss'
        : props.placeholder

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

    const inputProps = filterObject<DateTimeProps, InputProps>(props, [
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
          mask={(v) => mask(v, props.seconds)}
          onKeyDown={onKeyDown}
          icon={icon}
          ref={ref}
        />

        <Calendar
          time={{
            seconds: props.seconds,
          }}
          {...(typeof picker === 'object' ? picker : {})}
          type='single'
          absolute
          open={open}
          initialValue={value ? isoStringToDate(value) : undefined}
          onSubmit={{
            onClick: (date) => {
              if (!date) return
              setValue(getValueThroughDate(date, props.seconds))
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

DateTime.displayName = 'DateTime'

export default DateTime

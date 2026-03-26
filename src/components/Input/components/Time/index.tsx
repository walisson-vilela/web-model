import React from 'react'

import { numberOrDefault } from '../../../../functions/formatters'
import Input from '../Input'

import type { TimeProps } from './interfaces'

const mask = (v: string, seconds?: boolean) => {
  v = v.replace(/[^0-9\s]/g, '')

  while (v.length > 0 && parseInt(v[0]) > 2) {
    v = v.substring(1)
  }

  if (v.length > 1) {
    if (v[0] === '2') {
      while (v.length > 1 && parseInt(v[1]) > 3) {
        v = v[0] + v.substring(2)
      }
    }
  }

  if (v.length > 2) {
    while (v.length > 2 && parseInt(v[2]) > 5) {
      v = v.substring(0, 2) + v.substring(3)
    }
  }

  if (v.length > 4) {
    while (v.length > 4 && parseInt(v[4]) > 5) {
      v = v.substring(0, 4) + v.substring(5)
    }
  }

  v = v.substring(0, seconds ? 6 : 4)

  if (v.length < 3) return v
  else if (v.length < 5) return v.substring(0, 2) + ':' + v.substring(2)
  else return v.substring(0, 2) + ':' + v.substring(2, 4) + ':' + v.substring(4)
}

const getDate = (value: string) => {
  const v = value.replace(/[^0-9\s]/g, '')
  const h = numberOrDefault(v.substring(0, 2), 0)
  const m = numberOrDefault(v.substring(2, 4), 0)
  const s = numberOrDefault(v.substring(4, 6), 0)

  const date = new Date()
  date.setHours(h, m, s, 0)
  return date
}

const Time = React.forwardRef(
  (props: TimeProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { value, seconds } = props

    const _onKeyDown = props.onKeyDown || (() => {})
    const setValue = props.setValue || (() => {})

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      const target = event.target as HTMLInputElement

      const todayDate = new Date()

      const curH = todayDate.getHours()
      const curM = todayDate.getMinutes()
      const curS = todayDate.getSeconds()

      const value = target.value.replace(/[^0-9\s]/g, '')

      let tmp = value.substring(0, 2)
      const h = tmp.length === 0 ? curH : parseInt(tmp.padEnd(2, '0'))

      tmp = value.substring(2, 4)
      const m = tmp.length === 0 ? curM : parseInt(tmp.padEnd(2, '0'))

      tmp = value.substring(4, 6)
      const s = tmp.length === 0 ? curS : parseInt(tmp.padEnd(2, '0'))

      const date = new Date()
      date.setHours(h)
      date.setMinutes(m)
      date.setSeconds(s)

      const getReference = (date: Date) => {
        if (props.min) {
          const min = getDate(props.min)
          if (min.getTime() > date.getTime()) {
            return min
          }
        }

        if (props.max) {
          const max = getDate(props.max)
          if (max.getTime() < date.getTime()) {
            return max
          }
        }

        return date
      }

      if (event.key === 'ArrowUp') {
        if (seconds) {
          date.setSeconds(s + 1)

          const reference = getReference(date)
          setValue(
            [
              reference.getHours().toString().padStart(2, '0'),
              reference.getMinutes().toString().padStart(2, '0'),
              reference.getSeconds().toString().padStart(2, '0'),
            ].join(':'),
          )
        } else {
          date.setMinutes(m + 1)

          const reference = getReference(date)
          setValue(
            [
              reference.getHours().toString().padStart(2, '0'),
              reference.getMinutes().toString().padStart(2, '0'),
            ].join(':'),
          )
        }
      } else if (event.key === 'ArrowDown') {
        if (seconds) {
          date.setSeconds(s - 1)

          const reference = getReference(date)
          setValue(
            [
              reference.getHours().toString().padStart(2, '0'),
              reference.getMinutes().toString().padStart(2, '0'),
              reference.getSeconds().toString().padStart(2, '0'),
            ].join(':'),
          )
        } else {
          date.setMinutes(m - 1)

          const reference = getReference(date)
          setValue(
            [
              reference.getHours().toString().padStart(2, '0'),
              reference.getMinutes().toString().padStart(2, '0'),
            ].join(':'),
          )
        }
      }

      _onKeyDown(event)
    }

    const placeholder =
      props.placeholder === undefined
        ? seconds
          ? '––:––:––'
          : '––:––'
        : props.placeholder

    return (
      <Input
        {...props}
        type='text'
        value={mask(value, seconds)}
        placeholder={placeholder}
        mask={(v: string) => mask(v, seconds)}
        onKeyDown={onKeyDown}
        ref={ref}
      />
    )
  },
)

Time.displayName = 'Time'

export default Time

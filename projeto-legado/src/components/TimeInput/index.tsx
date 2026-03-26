import React from 'react'

import type { InputProps } from 'semantic-ui-react'

import type { Apperances } from './interfaces'
import * as S from './styled'

interface TimeInputProps extends InputProps {
  setValue: (string) => void
  apperance?: Apperances
}

const TimeInput = (props: TimeInputProps) => {
  const myProps = { ...props }

  const setValue = props.setValue
  delete myProps.setValue

  const onChange = myProps.onChange || (() => {})
  const onKeyDown = myProps.onKeyDown || (() => {})

  myProps.onChange = (event: any, data: any) => {
    const v = event.target.value

    const x = v.replace(/\D/g, '')

    if (x.length < 2) {
      setValue(x)
      return
    }
    let h = x.substr(0, 2)
    const m = x.substr(2, 2)

    h = Number.parseInt(h)
    h = h >= 0 ? (h <= 23 ? h : 23) : 0

    let txt = h.toString().padStart(2, '0')

    if (m.length > 0) {
      let newM = Number.parseInt(m)
      newM = newM >= 0 ? (newM <= 59 ? newM : 59) : 0

      txt = txt.concat(
        m.length === 1 ? `:${newM}` : `:${newM.toString().padStart(2, '0')}`,
      )
    }

    setValue(txt)

    onChange(event, data)
  }
  myProps.onKeyDown = (event: any, data: any) => {
    const v = event.target.value.replace(/\D/g, '')

    let h = Number.parseInt(v.substr(0, 2).padEnd(2, '0'))
    let m = Number.parseInt(v.substr(2, 2).padEnd(2, '0'))

    // up arrow
    if (event.keyCode === 38) {
      event.preventDefault()
      if (m < 59) m += 1
      else {
        m = 0

        if (h < 23) h += 1
        else h = 0
      }

      event.target.value = [h, m]
        .map((t) => t.toString().padStart(2, '0'))
        .join(':')
    }
    // down arrow
    else if (event.keyCode === 40) {
      event.preventDefault()
      if (m > 0) m -= 1
      else {
        m = 59

        if (h > 0) h -= 1
        else h = 23
      }

      event.target.value = [h, m]
        .map((t) => t.toString().padStart(2, '0'))
        .join(':')
    }

    onKeyDown(event, data)
  }

  myProps.type = 'text'
  myProps.placeholder = myProps.placeholder || '--:--'

  return <S.Input {...myProps} />
}

export default TimeInput

import React from 'react'

import { filterObject } from '../../../../../../functions/formatters'
import { getMask } from '../../../../functions'

import type { InputProps } from './interfaces'
import * as S from './styles'

const Input = React.forwardRef(
  (props: InputProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const [value, setValue] = props.value

    const _onKeyDown = props.onKeyDown || (() => {})
    const onPressEnter = props.onPressEnter
    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      _onKeyDown(e)
      if (e.key === 'Enter') {
        e.preventDefault()
        onPressEnter(e)
      }
    }

    const mask = getMask(props.mask)
    const _onChange = props.onChange || (() => {})
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      e.target.value = mask(e.target.value)
      _onChange(e)
      setValue(e.target.value)
    }

    const inputProps = filterObject<
      InputProps,
      Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>
    >(props, ['mask', 'value', 'onPressEnter', 'invalid', 'minWidth'])

    return (
      <S.Input
        ref={ref}
        {...inputProps}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        $invalid={props.invalid}
        $minWidth={props.minWidth}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input

import React from 'react'

import { filterObject } from '../../../../functions/formatters'

import type { RadioButtonProps } from './interfaces'
import * as S from './styles'

const RadioButton = (props: RadioButtonProps) => {
  const { label, disabled, required, invalid } = props

  const htmlProps = filterObject<
    RadioButtonProps,
    React.InputHTMLAttributes<HTMLInputElement>
  >(props, ['label', 'invalid', 'required'])

  return (
    <S.Label $disabled={disabled} $required={required} $invalid={invalid}>
      <input {...htmlProps} type='radio' />
      <span></span>

      {label && <S.LabelContainer>{label}</S.LabelContainer>}
    </S.Label>
  )
}

export default RadioButton

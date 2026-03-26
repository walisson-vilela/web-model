import React from 'react'

import { filterObject } from '../../functions/formatters'
import Loader from '../Loader'

import { sizes } from './constants'
import type { ButtonProps, StyledButtonProps } from './interfaces'
import * as S from './styles'

const Button = (props: ButtonProps) => {
  const { children, content, ...styled } = props

  const defaultValues: StyledButtonProps = {
    $appearance: styled.appearance || 'solid',
    $color: styled.color,
    $loading: styled.loading ? +styled.loading : +false,
    $size: styled.size || 'small',
    type: styled.type || 'button',
  }

  const htmlProps = filterObject<
    ButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>
  >(props, ['size', 'appearance', 'color', 'loading', 'content'])

  const loaderSize = sizes[defaultValues.$size].lineHeight

  return (
    <S.Button
      {...defaultValues}
      {...htmlProps}
      formNoValidate={
        'formNoValidate' in props
          ? props.formNoValidate
          : props.type === 'submit'
      }
    >
      {children || content}

      {props.loading && (
        <Loader
          color={defaultValues.$appearance === 'solid' ? 'white' : 'blue'}
          size={loaderSize}
          borderSize={`calc(${loaderSize} * 0.0757)`}
        />
      )}
    </S.Button>
  )
}

export default Button

import React from 'react'

import * as S from './styles'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode
  loading?: boolean
  fluid?: boolean
  transparent?: boolean
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive'
}

const iconSizes: Record<NonNullable<InputProps['size']>, number> = {
  mini: 14.2,
  small: 16,
  large: 19.5,
  big: 21.4,
  huge: 24,
  massive: 28.4,
}

const Input = (props: InputProps) => {
  const {
    icon,
    loading,
    fluid,
    transparent,
    size,
    disabled,
    style,
    ...inputProps
  } = { ...props }

  const iconSize = size ? iconSizes[size] : iconSizes.small

  return (
    <S.Container
      $fluid={fluid}
      $transparent={transparent}
      $disabled={disabled || loading}
      style={{
        ...(style || {}),
        ['--mw-input-icon-size' as string]: `${iconSize}px`,
      }}
    >
      <S.Input
        {...inputProps}
        disabled={disabled || loading}
        $hasIcon={!!icon}
      />
      {icon && <S.IconContainer>{icon}</S.IconContainer>}
    </S.Container>
  )
}

export default Input

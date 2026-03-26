import React from 'react'

import styled, { css } from 'styled-components'

import type { ColorOptions } from '../../theme/interfaces'
import { sizes } from '../Button/constants'

type Props = {
  size?: keyof typeof sizes
  colorSetting?:
    | ColorOptions
    | {
        normal?: ColorOptions
        hover?: ColorOptions
      }
  disabled?: boolean
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>

type StyledProps = {
  $size?: Props['size']
  $colorSetting?: Props['colorSetting']
  $disabled?: Props['disabled']
}

const Container = styled.div<StyledProps>`
  ${({ $size: size }) => {
    const { fontSize, lineHeight } = sizes[size || 'small']

    return css`
      font-size: ${fontSize};
      line-height: ${lineHeight};
    `
  }}

  color: ${({ $colorSetting: colorSetting, theme }) => {
    const def = 'greyishBlue' as const

    if (!colorSetting) return theme.colors[def]
    if (typeof colorSetting === 'string') return theme.colors[colorSetting]

    return theme.colors[colorSetting.normal || def]
  }};

  ${({ onClick, $disabled: disabled, theme, $colorSetting: colorSetting }) => {
    return disabled
      ? css`
          opacity: 0.5;
        `
      : onClick
      ? css`
          cursor: pointer;
          &:hover {
            color: ${theme.colors[
              {
                hover: 'blue' as const,
                ...(colorSetting && typeof colorSetting !== 'string'
                  ? colorSetting
                  : {}),
              }.hover
            ]};
          }
        `
      : null
  }}
`

const Link = ({ size, colorSetting, disabled, ...props }: Props) => {
  return (
    <Container
      {...props}
      $size={size}
      $colorSetting={colorSetting}
      $disabled={disabled}
    />
  )
}

export default Link

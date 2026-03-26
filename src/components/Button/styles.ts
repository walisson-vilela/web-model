import styled, { css } from 'styled-components'

import type { StyledButtonProps } from './interfaces'

export const Button = styled.button<StyledButtonProps>`
  padding: 0
    ${({ theme, $appearance: appearance }) =>
      appearance === 'link' ? 0 : theme.spacings.s3};
  font-family: ${({ theme }) => theme.fonts.Lato};
  font-weight: ${({ $appearance: appearance }) =>
    appearance === 'link' ? 'normal' : 'bold'};
  border-radius: 4px;
  position: relative;
  user-select: none;

  ${({ $size: size, theme }) => {
    const { sizes } = theme.components.button
    return css`
      font-size: ${sizes[size].fontSize};
      line-height: ${sizes[size].lineHeight};
      min-width: ${sizes[size].minWidth};
      min-height: ${sizes[size].minHeight};
    `
  }};

  ${({ $appearance: appearance, $color: color, theme }) => {
    const bgColor = ['bordered', 'link', 'borderless'].includes(appearance)
      ? 'transparent'
      : theme.getColor(color || 'blue')

    const borderColor =
      appearance !== 'bordered' ? bgColor : theme.getColor(color || 'blue')

    return css`
      background-color: ${bgColor};
      border: 1px solid ${borderColor};
    `
  }};

  color: ${({
    $appearance: appearance,
    $color: color,
    $loading: loading,
    theme,
  }) => {
    if (loading) return 'transparent'

    if (['link', 'borderless'].includes(appearance)) {
      return color ? theme.colors[color] : theme.getColor('greyishBlue', 50)
    }

    if (appearance === 'bordered') {
      return theme.getColor(color || 'blue')
    }

    return theme.getColor('white')
  }};

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    cursor: ${({ $loading: loading, disabled }) =>
      loading || disabled ? 'default' : 'pointer'};

    ${({ $appearance: appearance, $color: color, theme }) => {
      if (appearance === 'bordered') {
        return css`
          color: ${theme.getColor(color || 'blue', 70)};
          border: 1px solid ${theme.getColor(color || 'blue', 70)};
        `
      } else if (['link', 'borderless'].includes(appearance)) {
        return css`
          color: ${theme.colors.blue};
        `
      }

      return css`
        background-color: ${theme.getColor(color || 'blue', 70)};
        border-color: ${theme.getColor(color || 'blue', 70)};
      `
    }}
  }

  &:active {
    ${({ $appearance: appearance, $color: color, theme }) => {
      if (appearance === 'bordered') {
        return css`
          background-color: ${theme.getColor('iceWhite')};
        `
      }

      if (['link', 'borderless'].includes(appearance)) {
        return css`
          color: ${theme.getColor('blue', 50)};
        `
      }

      return css`
        color: ${theme.getColor(color || 'blue')};
      `
    }};
  }

  ${({ $loading: loading }) => {
    if (!loading) return

    return css`
      pointer-events: none;
    `
  }}
`

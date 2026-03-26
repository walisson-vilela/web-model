import React from 'react'

import styled, { css, keyframes } from 'styled-components'

import { isKeyOf, isString } from '../../functions/validators'

import type { LoaderProps, StyledLoaderProps } from './interfaces'

const loader = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Container = styled.div<StyledLoaderProps>`
  ${({
    $size: size,
    $borderSize: borderSize,
    $bgColor: bgColor,
    $color: color,
    theme,
    $filled: filled,
    $zIndex: zIndex,
  }) => {
    const s = borderSize || size
    borderSize = s ? `calc(${s} * 0.0757)` : '5px'
    size = size || '48px'
    color = color || 'blue'
    bgColor = bgColor || color

    const beforeColor = isKeyOf<typeof theme.colors>(theme.colors, bgColor)
      ? theme.getColor(bgColor, 25)
      : color

    const afterColor = isKeyOf<typeof theme.colors>(theme.colors, color)
      ? theme.getColor(color)
      : color

    const fill = !filled
      ? css``
      : css`
          position: absolute;
          left: 0;
          top: 0;
          background-color: ${() => {
            const fillColor = !isString(filled)
              ? theme.colors.white
              : isKeyOf<typeof theme.colors>(theme.colors, filled)
              ? theme.getColor(filled)
              : filled
            return fillColor
          }};
          width: 100%;
          height: 100%;
        `

    return css`
      ${fill}

      pointer-events: none;

      z-index: ${zIndex || 1};

      &::before,
      &::after {
        position: absolute;
        content: '';

        top: calc(50% - ${size} / 2);
        left: calc(50% - ${size} / 2);
        width: ${size};
        height: ${size};
        border-radius: 50%;
        border-width: ${borderSize};
        border-style: solid;
      }

      &::before {
        border-color: ${beforeColor};
      }

      &::after {
        animation: ${loader} 0.6s linear;
        animation-iteration-count: infinite;
        border-color: ${afterColor} transparent transparent;
      }
    `
  }}
`

const Loader = ({
  color,
  bgColor,
  size,
  borderSize,
  filled,
  zIndex,
  ...props
}: LoaderProps) => {
  return (
    <Container
      {...props}
      $color={color}
      $bgColor={bgColor}
      $size={size}
      $borderSize={borderSize}
      $filled={filled}
      $zIndex={zIndex}
    />
  )
}

export default Loader

import type { RuleSet } from 'styled-components'
import styled, { css } from 'styled-components'

import { isKeyOf } from '../../functions/common'
import { useTransition } from '../Transition'

import type { ContainerProps, Position, References } from './interfaces'

const positions: {
  [key in Position]: (reference: References, pointerSize: string) => RuleSet
} = {
  'top right': ({ bottom, left }, pointerSize) => css`
    top: ${bottom ? `calc(100% - ${bottom})` : 0};
    left: ${left || `calc(100% + ${pointerSize})`};
  `,
  'top left': ({ bottom, right }, pointerSize) => css`
    top: ${bottom ? `calc(100% - ${bottom})` : 0};
    right: ${right || `calc(100% + ${pointerSize})`};
  `,
  'bottom right': ({ top, left }, pointerSize) => css`
    bottom: ${top ? `calc(100% - ${top})` : 0};
    left: ${left || `calc(100% + ${pointerSize})`};
  `,
  'bottom left': ({ top, right }, pointerSize) => css`
    bottom: ${top ? `calc(100% - ${top})` : 0};
    right: ${right || `calc(100% + ${pointerSize})`};
  `,
  'right top': ({ bottom }, pointerSize) => css`
    bottom: ${bottom || `calc(100% + ${pointerSize})`};
    right: 0;
  `,
  'right bottom': ({ top }, pointerSize) => css`
    top: ${top || `calc(100% + ${pointerSize})`};
    right: 0;
  `,
  'left top': ({ bottom }, pointerSize) => css`
    bottom: ${bottom || `calc(100% + ${pointerSize})`};
    left: 0;
  `,
  'left bottom': ({ top }, pointerSize) => css`
    top: ${top || `calc(100% + ${pointerSize})`};
    left: 0;
  `,
}

const pointerPositions: {
  [key in Position]: (distance: string, size: string) => RuleSet
} = {
  'top right': (distance, size) => css`
    top: ${distance};
    left: calc(${size} / 2 * -1);
  `,
  'top left': (distance, size) => css`
    top: ${distance};
    right: calc(${size} / 2 * -1);
  `,
  'bottom right': (distance, size) => css`
    bottom: ${distance};
    left: calc(${size} / 2 * -1);
  `,
  'bottom left': (distance, size) => css`
    bottom: ${distance};
    right: calc(${size} / 2 * -1);
  `,
  'right top': (distance, size) => css`
    bottom: calc(${size} / 2 * -1);
    right: ${distance};
  `,
  'right bottom': (distance, size) => css`
    top: calc(${size} / 2 * -1);
    right: ${distance};
  `,
  'left top': (distance, size) => css`
    bottom: calc(${size} / 2 * -1);
    left: ${distance};
  `,
  'left bottom': (distance, size) => css`
    top: calc(${size} / 2 * -1);
    left: ${distance};
  `,
}

export const Container = styled.div<ContainerProps>`
  ${({ theme }) => theme.useTypography('p')};
  display: flex;

  > div {
    box-shadow: 0px 3px 6px ${({ theme }) => theme.getColor('black', 15)};
    border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
    overflow: hidden;
    z-index: 1;
    background-color: ${({ theme, $bgColor: bgColor }) =>
      !bgColor
        ? theme.colors.white
        : typeof bgColor === 'function'
        ? bgColor(theme)
        : isKeyOf(theme.colors, bgColor)
        ? theme.colors[bgColor]
        : bgColor};
  }

  z-index: ${({ $zIndex: zIndex }) => zIndex || 1};

  ${({ $width: width }) => {
    if (!width) return

    return css`
      width: ${width};
    `
  }}

  ${({ $height: height }) => {
    if (!height) return

    return css`
      height: ${height};
    `
  }}

  ${({ $maxWidth: maxWidth }) => {
    if (!maxWidth) return

    return css`
      max-width: ${maxWidth};
    `
  }}

  ${({ $maxHeight: maxHeight }) => {
    if (!maxHeight) return

    return css`
      max-height: ${maxHeight};
    `
  }}

  position: absolute;

  ${({
    theme,
    $position: position,
    $references: references,
    $pointer: pointer,
  }) => {
    if (!position) {
      return css`
        visibility: collapse;
      `
    }

    const pointerSize = pointer
      ? pointer === true
        ? theme.spacings.s1
        : typeof pointer.size === 'function'
        ? pointer.size(theme)
        : pointer.size || theme.spacings.s1
      : '0px'

    return positions[position](references || {}, pointerSize)
  }}

  ${(props) => {
    const { $transition: transition } = props

    if (transition === undefined) return

    return useTransition(transition, {
      'max-width': {
        disabled: '0px',
      },
      'max-height': {
        disabled: '0px',
      },
      width: {
        disabled: '0px',
      },
      height: {
        disabled: '0px',
      },
    })
  }};

  ${({ theme, $pointer: pointer, $position: position }) => {
    if (!pointer || !position) return

    const config: Required<typeof pointer> = {
      size: 's1',
      color: 'white',
      distance: 's1',
      ...(pointer === true ? {} : pointer),
    }

    const size =
      typeof config.size === 'function'
        ? config.size(theme)
        : isKeyOf(theme.spacings, config.size)
        ? theme.spacings[config.size]
        : config.size

    const distance =
      typeof config.distance === 'function'
        ? config.distance(theme)
        : isKeyOf(theme.spacings, config.distance)
        ? theme.spacings[config.distance]
        : config.distance

    const color =
      typeof config.color === 'function'
        ? config.color(theme)
        : isKeyOf(theme.colors, config.color)
        ? theme.colors[config.color]
        : config.color

    return css`
      &:after {
        content: '';

        position: absolute;

        ${pointerPositions[position](distance, size)}

        width: ${size};
        height: ${size};

        transform: rotate(45deg);

        background-color: ${color};
        box-shadow: 0px 3px 6px ${({ theme }) => theme.getColor('black', 15)};
        border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
      }
    `
  }}
`

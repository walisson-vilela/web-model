import styled, { css } from 'styled-components'

import { getSpacings } from '../../../../functions/formatters'
import type {
  ColorOptions,
  OpacitiyOptions,
} from '../../../../theme/interfaces'
import type { HorizontalAligns, VerticalAligns } from '../../interfaces'

import type { Striped, StyledRowProps } from './interfaces'

const horizontalAligns: { [key in HorizontalAligns]: string } = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  left: 'start',
  right: 'end',
}

const verticalAligns: { [key in VerticalAligns]: string } = {
  center: 'center',
  top: 'start',
  bottom: 'end',
}

export const Row = styled.div<StyledRowProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${({ $spacing: spacing }) => {
    if (spacing === undefined) return
    const padding = getSpacings(spacing)
    return css`
      padding: ${padding};
    `
  }}

  ${({ $spacingAround: spacingAround }) => {
    if (spacingAround) return

    return css`
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }
    `
  }}

  ${({ $horizontalAlign: horizontalAlign }) => {
    if (horizontalAlign === undefined) return
    return css`
      justify-content: ${horizontalAligns[horizontalAlign]};
    `
  }}

  ${({ $verticalAlign: verticalAlign }) => {
    if (verticalAlign === undefined) return
    return css`
      align-items: ${verticalAligns[verticalAlign]};
    `
  }}

  ${({ $striped: striped, $backgroundColor: backgroundColor, theme }) => {
    if (backgroundColor !== undefined) {
      const c = Array.isArray(backgroundColor)
        ? theme.getColor(...backgroundColor)
        : theme.colors[backgroundColor]

      return css`
        background-color: ${c};
      `
    }

    if (striped === undefined) {
      return css`
        background-color: ${theme.colors.white};
      `
    }

    const config: Partial<Striped> =
      striped === true ? { even: ['ghostWhite', 50] } : striped

    const colors: { [key in keyof Striped]: string } = (
      Object.keys(config) as (keyof Striped)[]
    ).reduce(
      (prev, key) => {
        const c = config[key]

        if (c === undefined) return prev

        return {
          ...prev,
          [key]: Array.isArray(c) ? theme.getColor(...c) : theme.colors[c],
        }
      },
      {
        even: theme.colors.white,
        odd: theme.colors.white,
      },
    )

    return css`
      &:nth-child(even) {
        background-color: ${colors.even};
      }
      &:nth-child(odd) {
        background-color: ${colors.odd};
      }
    `
  }}

  color: ${({ $fontColor: fontColor, theme }) => {
    if (fontColor === undefined) return theme.getColor('black', 80)

    const c = Array.isArray(fontColor)
      ? theme.getColor(...fontColor)
      : theme.colors[fontColor]

    return c
  }};

  ${({
    $borderless: borderless,
    theme: {
      colors: { lightestGrey },
    },
  }) => {
    if (borderless) return

    return css`
      border-bottom: 1px solid ${lightestGrey};
      &:last-child {
        border-bottom: 1px solid transparent;
      }
    `
  }}

  ${({ $hover: hover, theme }) => {
    if (!hover) return

    const h: ColorOptions | [ColorOptions, OpacitiyOptions] =
      hover === true ? ['lightGrey', 50] : hover

    const c = Array.isArray(h) ? theme.getColor(...h) : theme.colors[h]

    return css`
      &:hover {
        background-color: ${c};
      }
    `
  }}
`

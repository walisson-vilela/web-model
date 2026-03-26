import type { RuleSet } from 'styled-components'
import styled, { css } from 'styled-components'

import { getSpacings } from '../../../../functions/formatters'
import type {
  ColorOptions,
  OpacitiyOptions,
} from '../../../../theme/interfaces'

import type { StyledColProps } from './interfaces'

const aligns = {
  self: {
    horizontal: {
      center: 'center',
      left: 'flex-start',
      right: 'flex-end',
    },
    vertical: {
      center: 'center',
      top: 'flex-start',
      bottom: 'flex-end',
    },
  },
  content: {
    horizontal: {
      around: 'space-around',
      between: 'space-between',
      center: 'center',
      left: 'flex-start',
      right: 'flex-end',
    },
    vertical: {
      center: 'center',
      top: 'flex-start',
      bottom: 'flex-end',
    },
  },
}

export const Col = styled.div<StyledColProps>`
  display: flex;
  flex-wrap: wrap;
  position: relative;

  ${({ $width: width }) => {
    if (width === undefined) {
      return css`
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
        width: 100%;
      `
    } else if (width === 'auto') {
      return css`
        flex: 0 0 auto;
        width: auto;
        max-width: none;
      `
    }

    const w = (parseFloat(width) * 100) / 12

    return css`
      flex: 0 0 ${w}%;
      max-width: ${w}%;
      width: 100%;
    `
  }}

  padding: ${({ $spacing: spacing }) => {
    const padding = getSpacings(spacing === undefined ? 's1' : spacing)
    return padding
  }};

  ${({ $spacingAround: spacingAround }) => {
    if (spacingAround) return

    return css`
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    `
  }}

  ${({ $align: align }) => {
    if (align === undefined) return

    const styles: RuleSet[] = []

    if (align.self !== undefined) {
      if (align.self.horizontal !== undefined) {
        const v = align.self.horizontal
        const a = aligns.self.horizontal

        styles.push(css`
          justify-self: ${a[v]};
        `)
      }

      if (align.self.vertical !== undefined) {
        const v = align.self.vertical
        const a = aligns.self.vertical

        styles.push(css`
          align-self: ${a[v]};
        `)
      }
    }

    if (align.content !== undefined) {
      if (align.content.horizontal !== undefined) {
        const v = align.content.horizontal
        const a = aligns.content.horizontal

        styles.push(css`
          justify-content: ${a[v]};
        `)
      }

      if (align.content.vertical !== undefined) {
        const v = align.content.vertical
        const a = aligns.content.vertical

        styles.push(css`
          align-items: ${a[v]};
        `)
      }
    }

    if (align.text !== undefined) {
      const v = align.text

      styles.push(css`
        text-align: ${v};
      `)
    }

    return styles
  }}

  ${({
    $bordered: bordered,
    theme: {
      colors: { lightestGrey },
    },
  }) => {
    if (!bordered) return

    return css`
      &:not(:last-child) {
        border-right: 1px solid ${lightestGrey};
      }
    `
  }}

  ${({ $fontColor: fontColor, theme }) => {
    if (fontColor === undefined) return

    const c = Array.isArray(fontColor)
      ? theme.getColor(...fontColor)
      : theme.colors[fontColor]

    return css`
      color: ${c};
    `
  }};

  ${({ $backgroundColor: backgroundColor, theme }) => {
    if (backgroundColor === undefined) return

    const c = Array.isArray(backgroundColor)
      ? theme.getColor(...backgroundColor)
      : theme.colors[backgroundColor]

    return css`
      background-color: ${c};
    `
  }};

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

  ${({ $pointer: pointer }) => {
    if (!pointer) return

    return css`
      cursor: pointer;
    `
  }}
`

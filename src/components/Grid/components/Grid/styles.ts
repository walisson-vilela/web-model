import styled, { css } from 'styled-components'

import { getSpacings } from '../../../../functions/formatters'

import type { StyledGridProps } from './interfaces'

export const Grid = styled.div<StyledGridProps>`
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

  ${({
    $borderless: borderless,
    theme: {
      colors: { lightestGrey },
    },
  }) => {
    if (borderless) return

    return css`
      border: 1px solid ${lightestGrey};
    `
  }}
`

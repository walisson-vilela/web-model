import styled, { css } from 'styled-components'

import { getSpacings } from '../../../../functions/formatters'
import type { StyledAfterBefore } from '../../interfaces'

const BeforeAfterContainer = styled.div<StyledAfterBefore>`
  ${({ theme, $fluid: fluid, $spacing: spacing }) => {
    const padding = getSpacings(spacing || '0', {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    }).split(' ')

    padding[1] = fluid ? '0' : `calc(${theme.spacings.s1} * 1.5)`

    return css`
      padding: ${padding.join(' ')};
    `
  }}

  ${({ theme, $background: background }) => {
    if (!background) return
    const args: Parameters<typeof theme.getColor> = Array.isArray(background)
      ? background
      : [background]

    const value = theme.getColor(...args)

    return css`
      background-color: ${value};
      &:after {
        background-color: ${value};
      }
    `
  }}

  display: flex;
  flex-direction: column;

  position: relative;

  &:after {
    content: '';
    width: ${({ theme }) => `calc(${theme.spacings.s1} * .5)`};
    height: 100%;

    position: absolute;
    top: 0;
    left: 100%;
  }
`

export default BeforeAfterContainer

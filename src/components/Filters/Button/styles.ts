import styled, { css } from 'styled-components'

import type { SpacingOrZero } from '../../../interfaces'

export const Container = styled.div<{ $gap: SpacingOrZero }>`
  display: flex;
  gap: ${({ theme, $gap: gap }) => (gap === '0' ? '0' : theme.spacings[gap])};
  align-items: center;
  color: ${({ theme }) => theme.colors.darkestGrey};

  ${({ onClick }) => {
    if (!onClick) {
      return css`
        opacity: 0.3;
        pointer-events: none;
      `
    }

    return css`
      cursor: pointer;
    `
  }}
`

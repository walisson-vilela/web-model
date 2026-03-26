import styled, { css } from 'styled-components'

import type { StyledEllipsisContainerProps } from './types'

export const EllipsisContainer = styled.div<StyledEllipsisContainerProps>`
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $lines: lines }) => {
    return lines
      ? css`
          display: -webkit-box;

          -webkit-box-orient: vertical;
          -moz-box-orient: vertical;
          -ms-box-orient: vertical;
          box-orient: vertical;

          -webkit-line-clamp: ${lines};
          -moz-line-clamp: ${lines};
          -ms-line-clamp: ${lines};
          line-clamp: ${lines};
        `
      : css`
          white-space: nowrap;
        `
  }}
`

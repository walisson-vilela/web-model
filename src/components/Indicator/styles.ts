import styled, { css } from 'styled-components'

import { sizes, types } from './constants'
import type { StyledIndicatorProps } from './interfaces'

export const Container = styled.div<StyledIndicatorProps>`
  color: ${({ theme, $labelColor: labelColor }) => theme.getColor(labelColor)};
  display: flex;
  align-items: center;
  gap: ${({ theme: { spacings } }) => spacings.s1};

  &:before {
    content: '';
    display: block;
    border-radius: 100%;

    ${({ $size: size }) => css`
      width: ${sizes[size]};
      height: ${sizes[size]};
    `};

    background-color: ${({ theme: { colors }, $type: type }) =>
      colors[types[type]]};
  }
`

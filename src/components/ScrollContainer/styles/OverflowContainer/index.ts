import styled, { css } from 'styled-components'

import { getSpacings } from '../../../../functions/formatters'
import type { OverflowContainerProps } from '../../interfaces'

const OverflowContainer = styled.div<OverflowContainerProps>`
  overflow-y: scroll;
  overflow-y: overlay;
  width: 100%;
  position: relative;

  flex: 1;
  display: flex;
  flex-direction: column;

  ${({ $height: height, $maxHeight: maxHeight }) => {
    if (height) {
      return css`
        min-height: ${height};
        max-height: ${maxHeight || height};
      `
    }

    return css`
      max-height: ${maxHeight || '100%'};
    `
  }};

  scrollbar-color: ${({ theme }) =>
    `${theme.colors.grey} ${theme.colors.white}`};
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey};
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.white};
  }

  ${({ $spacing: spacing, theme }) => {
    const value = getSpacings(spacing || '0', '0').split(' ')

    return css`
      padding: ${value[0]} calc(${theme.spacings.s1} * 1.5) ${value[2]}
        ${value[3]};
    `
  }};
`

export default OverflowContainer

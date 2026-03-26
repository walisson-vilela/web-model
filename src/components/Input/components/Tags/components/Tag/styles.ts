import styled from 'styled-components'

import type { StyledTagProps } from './interfaces'

export const Tag = styled.div<StyledTagProps>`
  ${({ theme }) => theme.useTypography('p')}

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkBlue};
  padding: calc(${({ theme }) => theme.spacings.s1} / 2);

  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme, $invalid: invalid }) =>
    theme.colors[invalid ? 'warningRed' : 'lightGrey']};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};

  > div:last-child {
    cursor: pointer;
  }
`

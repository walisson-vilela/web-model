import styled from 'styled-components'

import type { StyledInputProps } from './interfaces'

export const Input = styled.input<StyledInputProps>`
  ${({ theme }) => theme.useTypography('p')}

  color: ${({ theme, $invalid: invalid }) => {
    return invalid ? theme.colors.warningRed : theme.colors.darkBlue
  }};

  &::placeholder {
    color: ${({ theme, $invalid: invalid }) => {
      return invalid ? theme.colors.warningRed : theme.colors.darkGrey
    }};

    ${({ theme }) => theme.useTypography('p')}
    opacity: 1;
  }

  display: block;
  box-sizing: border-box;
  flex: 1;
  min-width: ${({ $minWidth: minWidth }) => minWidth || '20%'};

  padding: calc(${({ theme }) => theme.spacings.s1} / 2) 0;

  box-shadow: none;
  outline: none;
  border: 1px solid transparent;
`

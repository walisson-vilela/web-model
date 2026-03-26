import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'
import styled, { css } from 'styled-components'

import { HeaderProps } from './types'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > :not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.getColor('lightestGrey', 80)};
  }
`

const appearances: {
  [key in Exclude<HeaderProps['$appearance'], undefined> | 'default']: {
    background: ColorOptions
    color: ColorOptions
  }
} = {
  default: {
    background: 'white',
    color: 'greyishBlue',
  },
  info: {
    background: 'blue',
    color: 'white',
  },
  success: {
    background: 'lightGreen',
    color: 'white',
  },
  error: {
    background: 'warningRed',
    color: 'white',
  },
  warning: {
    background: 'warningYellow',
    color: 'white',
  },
}

export const Header = styled.div<HeaderProps>`
  padding: ${({ theme }) => theme.spacings.s4};
  ${({ theme, $appearance: appearance }) => {
    const { background, color } = appearances[appearance || 'default']
    return css`
      background-color: ${theme.colors[background]};
      color: ${theme.colors[color]};
    `
  }}

  ${({ theme }) => theme.useTypography('h1')};
  line-height: 20px;
`

export const Body = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacings.s4};
  min-height: 89px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;
  color: ${({ theme }) => theme.getColor('greyishBlue', 70)};
`

export const Footer = styled.div`
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  justify-content: end;
`

import { ThemeInterface } from '@mw-kit/mw-ui/types'
import styled, { css } from 'styled-components'

const ErrorMessage = styled.div<{
  $spacingTop?: keyof ThemeInterface['spacings'] | '0'
}>`
  ${({ theme }) => theme.useTypography('p')}
  font-weight: 500;
  color: ${({ theme }) => theme.colors.warningRed};

  margin-top: ${({ theme: { spacings }, $spacingTop: spacingTop }) => {
    if (!spacingTop) return `calc(${spacings.s1} / 2)`
    return spacingTop !== '0' ? spacings[spacingTop] : spacingTop
  }};

  ${({ children }) => {
    if (children) return
    return css`
      :after {
        content: ' ';
        white-space: pre;
      }
    `
  }}
`

export default ErrorMessage

import { ThemeInterface } from '@mw-kit/mw-ui/types'
import styled, { css } from 'styled-components'

const colors: {
  [k in 'yellow' | 'red']: {
    border: Parameters<ThemeInterface['getColor']>
    font: Parameters<ThemeInterface['getColor']>
    background: Parameters<ThemeInterface['getColor']>
  }
} = {
  yellow: {
    border: ['vanilla', 100],
    font: ['bronze', 100],
    background: ['floralWhite', 100],
  },
  red: {
    border: ['warningRed', 100],
    font: ['warningRed', 100],
    background: ['warningRed', 5],
  },
}

export const Container = styled.div<{ $color: 'yellow' | 'red' }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};

  ${({ theme, $color: color }) => {
    const { border, font, background } = colors[color]

    return css`
      border: 1px solid ${theme.getColor(...border)};
      background-color: ${theme.getColor(...background)};
      color: ${theme.getColor(...font)};
    `
  }}

  border-radius: 4px;
  margin-bottom: -${({ theme }) => theme.spacings.s3};
`

export const SubContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  align-items: center;
`

export const Title = styled.div`
  ${({ theme }) => theme.useTypography('h3', { fontWeight: 'bold' })};
`

export const Link = styled.div`
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    `};

  color: ${({ theme }) => theme.colors.blue};
`

import { ThemeInterface } from '@mw-kit/mw-ui/types'
import styled, { css } from 'styled-components'

export const ContainerCheckAddress = styled.div<{
  $colorValue: keyof ThemeInterface['colors'] | '#7666bb'
  $right?: true
}>`
  display: flex;

  align-items: center;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ $right: right }) =>
    right &&
    css`
      direction: rtl;
    `}

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme, $colorValue: colorValue }) =>
      colorValue in theme.colors
        ? theme.getColor(colorValue as keyof ThemeInterface['colors'])
        : colorValue};
    border-radius: 100%;
  }
`

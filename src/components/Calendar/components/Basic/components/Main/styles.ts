import styled, { css } from 'styled-components'

import type { ColorOptions } from '../../../../../../theme/interfaces'
import Indicator from '../../../../../Indicator'
import { sizes } from '../../../../../Indicator/constants'
import type { DayAppearance } from '../../interfaces'

export * from '../../styles'

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button:last-child {
    margin-left: auto;
  }
`

export const WeekContainer = styled.div`
  width: 100%;
  display: flex;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  }

  > * {
    ${({ theme }) =>
      theme.useTypography('h6', {
        lineHeight: theme.spacings.s3,
      })}
    width: 25px;
    height: 25px;

    color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: none;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    border: 1px solid transparent;
    &:not(:last-child) {
      border-right-color: ${({ theme }) => theme.colors.lightestGrey};
    }
  }
`

export const Header = styled.div`
  width: 100%;

  background-color: ${({ theme }) => theme.getColor('lightestGrey', 40)};
  font-weight: bolder;

  > ${WeekContainer} {
    border-top: none;
    > * {
      border-right-color: transparent;
    }
  }
`

interface DayContainerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $today: 1 | 0
  $appearance?: DayAppearance
  $activeColor: ColorOptions
}

export const DayContainer = styled.button<DayContainerProps>`
  position: relative;
  overflow: hidden;

  ${({
    theme,
    $appearance: appearance,
    $activeColor: activeColor,
    onClick,
  }) => {
    const hover = onClick
      ? (color: keyof typeof theme.colors) => css`
          &:not(:disabled):hover {
            border-color: ${theme.colors[color]};
            color: ${theme.colors[color]};
            cursor: pointer;
          }
        `
      : () => null

    if (appearance === 'disabled') {
      return css`
        background-color: ${theme.getColor('greyishBlue', 10)};
      `
    } else if (appearance === 'highlight') {
      return css`
        background-color: ${theme.getColor('blue', 30)};
        ${hover('blue')}
      `
    } else if (appearance === 'active') {
      return css`
        background-color: ${theme.colors[activeColor]};
        color: ${theme.colors.white};
        &:not(:last-child) {
          border-right-color: ${({ theme }) => theme.colors[activeColor]};
        }
        ${hover('white')}
      `
    }

    return css`
      background-color: ${theme.colors.white};
      ${hover('blue')}
    `
  }};

  &:disabled {
    color: ${({ theme }) => theme.colors.silver};
  }

  &,
  &:after {
    transition-property: background-color, color, border-color;
    transition-timing-function: ease-in-out;
    transition-duration: 0.25s;
  }

  ${({ $appearance: appearance, $today: today, theme }) => {
    if (today !== 1) {
      return
    }

    return css`
      &:after {
        content: '';
        position: absolute;
        top: -60%;
        right: -60%;
        width: 100%;
        height: 100%;
        background-color: ${theme.colors[
          appearance === 'active' ? 'white' : 'blue'
        ]};
        transform: rotate(45deg);
      }
    `
  }}
`

// 1px here is the border-width: 0 0 1 1
export const DayIndicator = styled(Indicator).attrs({
  size: 'mini',
})`
  position: absolute;
  bottom: 1px;
  left: calc(50% - (${sizes.mini} / 2) + 1px);
`

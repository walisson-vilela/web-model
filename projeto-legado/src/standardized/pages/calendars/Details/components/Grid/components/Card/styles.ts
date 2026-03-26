import type { IndicatorProps } from '@mw-kit/mw-ui/dist/components/Indicator/interfaces'
import { ThemeInterface } from '@mw-kit/mw-ui/types'
import styled, { css } from 'styled-components'

export const Card = styled.div<{
  $bgColor: 'iceWhite' | 'white'
  $disabled: boolean
  $past: boolean
}>`
  position: relative;

  border: 1px solid ${({ theme }) => theme.getColor('lightestGrey', 80)};
  padding: ${({ theme }) =>
    `${theme.spacings.s1} ${theme.spacings.s1} ${theme.spacings.s1} calc(${theme.spacings.s3} + 17px)`};
  box-shadow: 0px 3px 6px #00000029;

  background-color: ${({ theme, $bgColor }) => theme.getColor($bgColor)};

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.darkBlue};

  > div {
    display: flex;
    gap: ${({ theme }) => theme.spacings.s3};

    > div {
      align-content: center;
    }

    > div:nth-child(2) {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacings.s1};

      ${({ $disabled: disabled }) =>
        disabled &&
        css`
          opacity: 0.5;
        `}

      > div {
        display: flex;
        gap: calc(${({ theme }) => theme.spacings.s1} / 2);
        place-items: center;
      }
    }
  }
`

export const EventItem = styled.div<{
  $appearance: 'past' | 'present' | 'future'
}>`
  display: flex;
  gap: ${({ theme }) => `calc(${theme.spacings.s1} / 2)`};
  :before {
    content: '-';
  }

  ${({ theme, $appearance: appearance }) => {
    return {
      past: css`
        opacity: 0.5;
      `,
      present: theme.useTypography('h2'),
      future: css``,
    }[appearance]
  }}
`

export const StatusContainer = styled.div<{ $color: IndicatorProps['type'] }>`
  padding-left: calc(${({ theme }) => theme.spacings.s3} + 1px);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  position: relative;

  > div {
    color: ${({ theme, $color: color }) => {
      const map: { [k in typeof color]: string } = {
        default: theme.colors.warningGray,
        info: theme.colors.blue,
        danger: theme.colors.warningRed,
        success: theme.colors.green,
        warning: theme.colors.warningYellow,
      }

      return map[color]
    }};
  }

  :before {
    content: '';
    position: absolute;
    left: 0;
    top: calc(${({ theme }) => theme.spacings.s3} / -2);
    width: 1px;
    height: calc(100% + ${({ theme }) => theme.spacings.s3});
    background-color: ${({ theme }) => theme.getColor('lightestGrey', 80)};
  }
`

export const StatusDiv = styled.div<{
  $color:
    | keyof ThemeInterface['colors']
    | Parameters<ThemeInterface['getColor']>
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 17px;
  height: 100%;
  ${({ theme }) => theme.useTypography('p', { fontWeight: 'bold' })}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, $color: color }) => {
    const c =
      typeof color === 'string'
        ? ([color] as Parameters<ThemeInterface['getColor']>)
        : color
    return theme.getColor(...c)
  }};
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    transform: rotate(-90deg);
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }
`

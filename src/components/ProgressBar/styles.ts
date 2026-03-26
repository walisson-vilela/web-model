import styled from 'styled-components'

import type { ThemeInterface } from '../../interfaces'

import type { StyledProgressBarProps } from './interfaces'

export const Container = styled.div<{ $disabled: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: ${({ $disabled: disabled }) => (disabled ? 0.5 : 1)};
  width: 100%;

  > span {
    display: inline-block;
    margin-left: 7px;
    color: #000000cc;
  }
`

export const Progress = styled.div<StyledProgressBarProps>`
  width: 100%;
  height: 12px;
  border: 1px solid #e4e4e4;

  > span {
    content: '';
    display: flex;

    height: 100%;

    transition-property: width background-color;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;

    background-color: ${({ theme, $type: type }) => {
      const colors: {
        [T in StyledProgressBarProps['$type']]: keyof ThemeInterface['colors']
      } = {
        default: 'warningGray',
        info: 'blue',
        danger: 'warningRed',
        success: 'green',
        warning: 'warningYellow',
      }

      return theme.colors[colors[type]]
    }};
  }
`

import type { RuleSet } from 'styled-components'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: inline-flex;
`

interface TooltipProps {
  /** largura da tooltip */
  $width?: 'large' | 'medium' | 'small'
  /** posicao da tooltip */
  $position?: 'top' | 'left' | 'bottom' | 'right'
}

const maxWidths = {
  large: 600,
  medium: 400,
  small: 200,
}

const positions: {
  [K in Exclude<TooltipProps['$position'], undefined>]: (
    arrowSize: number,
  ) => RuleSet
} = {
  top: (arrowSize: number) => css`
    bottom: calc(100% + 7px);
    left: 50%;
    transform: translateX(-50%);

    &:after {
      bottom: -${arrowSize / 2}px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
  `,
  left: (arrowSize: number) => css`
    right: calc(100% + 7px);
    top: 50%;
    transform: translateY(-50%);

    &:after {
      top: 50%;
      right: -${arrowSize / 2}px;
      transform: translateY(-50%) rotate(45deg);
    }
  `,
  bottom: (arrowSize: number) => css`
    top: calc(100% + 7px);
    left: 50%;
    transform: translateX(-50%);

    &:after {
      top: -${arrowSize / 2}px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
  `,
  right: (arrowSize: number) => css`
    left: calc(100% + 7px);
    top: 50%;
    transform: translateY(-50%);

    &:after {
      top: 50%;
      left: -${arrowSize / 2}px;
      transform: translateY(-50%) rotate(45deg);
    }
  `,
}

export const Tooltip = styled.div<TooltipProps>`
  position: absolute;
  padding: 12px 14px;
  border-radius: 4px;
  text-align: center;
  white-space: normal;
  overflow-wrap: break-word;

  background-color: #1b1c1d;
  color: #fff;

  z-index: 99;

  ${({ $width: width, $position: position }) => {
    const widthName = width || 'small'
    const positionName = position || 'bottom'

    const maxWidthPx = maxWidths[widthName]
    const arrowSize = 7

    return css`
      ${positions[positionName](arrowSize)}
      width: max-content;
      max-width: ${maxWidthPx}px;
    `
  }}

  &:after {
    content: '';
    width: 7px;
    height: 7px;
    position: absolute;
    background-color: #1b1c1d;
  }
`

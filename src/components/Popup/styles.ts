import styled, { css } from 'styled-components'

import type { PopupProps } from './types'

export const TooltipArrow = styled.div<{
  $placement: PopupProps['placement']
  $arrow?: Exclude<PopupProps['arrow'], 'none'>
}>`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;

  ${({ $arrow: arrow, $placement: placement }) => {
    const width = (arrow || 'pointed') === 'flattened' ? 30 : 16
    const halfWidth = width / 2
    const borderSize = 1
    const length = 6

    const [side, align] = placement.split('-')

    if (side === 'top' || side === 'bottom') {
      const vertical =
        side === 'top'
          ? css`
              bottom: 0;
              &::before {
                content: '';
                position: absolute;
                left: -${halfWidth}px;
                border-left: ${halfWidth}px solid transparent;
                border-right: ${halfWidth}px solid transparent;
                border-top: ${length}px solid var(--tooltip-border);
              }
              &::after {
                content: '';
                position: absolute;
                left: -${halfWidth - borderSize}px;
                top: -${borderSize}px;
                border-left: ${halfWidth - borderSize}px solid transparent;
                border-right: ${halfWidth - borderSize}px solid transparent;
                border-top: ${length - borderSize}px solid var(--tooltip-bg);
              }
            `
          : css`
              top: -${length}px;
              &::before {
                content: '';
                position: absolute;
                left: -${halfWidth}px;
                border-left: ${halfWidth}px solid transparent;
                border-right: ${halfWidth}px solid transparent;
                border-bottom: ${length}px solid var(--tooltip-border);
              }
              &::after {
                content: '';
                position: absolute;
                left: -${halfWidth - borderSize}px;
                top: ${borderSize}px;
                border-left: ${halfWidth - borderSize}px solid transparent;
                border-right: ${halfWidth - borderSize}px solid transparent;
                border-bottom: ${length - borderSize}px solid var(--tooltip-bg);
              }
            `

      const alignStyles =
        align === 'start'
          ? css`
              left: ${halfWidth}px;
              margin-left: ${length}px;
            `
          : align === 'end'
          ? css`
              right: ${halfWidth}px;
              margin-right: ${length}px;
            `
          : css`
              left: 50%;
            `

      return css`
        ${vertical}
        ${alignStyles}
      `
    }

    const horizontal =
      side === 'left'
        ? css`
            right: 0;
            &::before {
              content: '';
              position: absolute;
              top: -${halfWidth}px;
              border-top: ${halfWidth}px solid transparent;
              border-bottom: ${halfWidth}px solid transparent;
              border-left: ${length}px solid var(--tooltip-border);
            }
            &::after {
              content: '';
              position: absolute;
              top: -${halfWidth - borderSize}px;
              left: -${borderSize}px;
              border-top: ${halfWidth - borderSize}px solid transparent;
              border-bottom: ${halfWidth - borderSize}px solid transparent;
              border-left: ${length - borderSize}px solid var(--tooltip-bg);
            }
          `
        : css`
            left: -${length}px;
            &::before {
              content: '';
              position: absolute;
              top: -${halfWidth}px;
              border-top: ${halfWidth}px solid transparent;
              border-bottom: ${halfWidth}px solid transparent;
              border-right: ${length}px solid var(--tooltip-border);
            }
            &::after {
              content: '';
              position: absolute;
              top: -${halfWidth - borderSize}px;
              left: ${borderSize}px;
              border-top: ${halfWidth - borderSize}px solid transparent;
              border-bottom: ${halfWidth - borderSize}px solid transparent;
              border-right: ${length - borderSize}px solid var(--tooltip-bg);
            }
          `

    if (align === 'start') {
      return css`
        top: ${halfWidth}px;
        margin-top: ${length}px;
        ${horizontal}
      `
    }

    if (align === 'end') {
      return css`
        bottom: ${halfWidth}px;
        margin-bottom: ${length}px;
        ${horizontal}
      `
    }

    return css`
      top: 50%;
      ${horizontal}
    `
  }}
`

export const TooltipSurface = styled.div<{
  $placement: PopupProps['placement']
  $background?: PopupProps['background']
}>`
  ${({ theme }) => theme.useTypography('p')}

  ${({ theme, $background: background, $placement: placement }) => {
    const [side] = placement.split('-')
    const [bgColor, fontColor, borderColor, borderRadius] =
      background === 'light'
        ? [theme.colors.white, theme.colors.greyishBlue, '#eeeeee', 5]
        : [
            theme.colors.greyishBlue,
            theme.colors.white,
            theme.colors.greyishBlue,
            0,
          ]

    const boxShadow = {
      top: [0, -4],
      bottom: [0, 4],
      right: [4, 0],
      left: [-4, 0],
    }[side] || [0, 4]

    return css`
      --tooltip-bg: ${bgColor};
      --tooltip-border: ${borderColor};
      border: 1px solid ${borderColor};
      border-radius: ${borderRadius}px;
      box-shadow: ${boxShadow[0]}px ${boxShadow[1]}px 10px
        ${theme.getColor('black', 10)};
      color: ${fontColor};

      &,
      & ${TooltipArrow} {
        background-color: ${bgColor};
      }
    `
  }}

  padding: ${({ theme }) => theme.spacings.s3};
`

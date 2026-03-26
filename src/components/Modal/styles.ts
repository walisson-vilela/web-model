import styled, { css } from 'styled-components'

import { heights, widths } from './contants'
import type { StyledModalProps } from './interfaces'

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px);
  background-color: ${({ theme }) => theme.getColor('black', 25)};
`

export const Content = styled.div`
  flex: 1;
  position: relative;
  ${({ theme: { spacings, useTypography, colors } }) => css`
    padding: ${spacings.s4};
    color: ${colors.darkBlue};
    ${useTypography('p')}
  `}
`

export const Header = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ theme: { colors, spacings, useTypography } }) => css`
    border-bottom: 1px solid ${colors.lightestGrey};
    padding: ${spacings.s4};

    ${useTypography('h1')}
  `}
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme: { spacings, colors } }) => css`
    border-top: 1px solid ${colors.lightestGrey};
    padding: ${spacings.s3};
  `}
`

export const FooterMessage = styled.div`
  max-width: 75%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ theme: { useTypography, colors } }) => css`
    ${useTypography('p')}
    color: ${colors.darkBlue};
    opacity: 0.75;
  `}
`

export const FooterButtons = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacings.s3};
`

export const Container = styled.div<StyledModalProps>`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.Lato};

  ${({
    theme,
    $size: size,
    $customSize: customSize,
    $color: color,
    $inverted: inverted,
  }) => css`
    background-color: ${theme.colors.white};
    box-shadow: 0 0 21px 7px ${theme.getColor('black', 15)};

    width: ${size === 'custom' && customSize
      ? customSize.width || 'auto'
      : widths[size]};

    height: ${size === 'custom' && customSize
      ? customSize.height || 'auto'
      : heights[size]};

    ${Header} {
      background-color: ${inverted
        ? theme.isDarkColor(color)
        : theme.colors[color]};
      color: ${inverted ? theme.colors[color] : theme.isDarkColor(color)};
    }
  `}
`

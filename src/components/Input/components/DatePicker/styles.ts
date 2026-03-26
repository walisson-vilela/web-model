import type React from 'react'

import styled, { css } from 'styled-components'

export const RelativeContainer = styled.div`
  position: relative;

  input {
    color: transparent;
  }
`

export const LabelContainer = styled.div`
  ${({ theme }) =>
    theme.useTypography('p', {
      lineHeight: theme.spacings.s3,
    })}
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  line-height: 1;
`

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  $iconWidth: string
  $invalid?: boolean
  $disabled?: boolean
  $paddingless?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;

  ${({ theme, $iconWidth: iconWidth, $paddingless: paddingless }) => {
    const borderwidth = 1

    if (paddingless) {
    return css`
        bottom: ${borderwidth}px;
        left: ${borderwidth}px;
        width: calc(100% - ${borderwidth * 2}px - ${iconWidth});
        height: calc(17px + ${borderwidth * 2}px);
      `
    }

    return css`
      bottom: ${borderwidth}px;
      left: ${borderwidth}px;
      width: calc(
        100% - ${borderwidth * 2}px - ${iconWidth} - ${theme.spacings.s3}
      );
      height: calc(31px + ${borderwidth * 2}px);
      padding: 0 0 0 ${theme.spacings.s3};
    `
  }}

  ${({ $invalid: invalid, theme }) => {
    if (!invalid) return

    return css`
      color: ${theme.colors.warningRed};
    `
  }}

  ${({ $disabled: disabled }) => {
    if (!disabled) return

    return css`
      opacity: 0.5;
    `
  }}
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
  line-height: 0;

  svg {
    display: block;
  }

  ${({ onClick }) => {
    if (!onClick) return

    return css`
      &:not(:disabled) {
        cursor: pointer;
      }
    `
  }};
`

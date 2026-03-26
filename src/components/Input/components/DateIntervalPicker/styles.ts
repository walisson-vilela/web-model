import type React from 'react'

import styled, { css } from 'styled-components'

interface RelativeContainerProps {
  $invalid: boolean
}

export const RelativeContainer = styled.div<RelativeContainerProps>`
  position: relative;
  user-select: none;
  min-width: 220px;

  > input,
  > label > input {
    color: transparent;
    background-color: transparent;
    width: 1px;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    border: 0;
    padding: 0;
    overflow: hidden;
    outline: none;
    box-shadow: none;
  }
`

export const LabelContainer = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:first-child {
    text-align: left;
  }
  &:not(:first-child) {
    text-align: center;
  }

  ${({ children }) => {
    if (children) return
    return css`
      &:after {
        content: '--/--/-- (--:--) à --/--/-- (--:--)';
        color: ${({ theme }) => theme.colors.darkGrey};
      }
    `
  }}

  ${({ onClick }) => {
    if (!onClick) return

    return css`
      &:not(:disabled) {
        cursor: pointer;
      }
    `
  }};
`

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  $invalid?: boolean
  $disabled?: boolean
  $paddingless?: boolean
  $borderless?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  white-space: nowrap;
  gap: ${({ theme }) => theme.spacings.s1};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, $invalid: invalid, $borderless: borderless }) => {
    if (borderless) return 'transparent'
    return invalid ? theme.colors.warningRed : theme.colors.lightGrey
  }};

  width: 100%;
  font-size: 14px;

  ${({ theme, $invalid: invalid }) => {
    const [bgColor, color] = invalid
      ? [theme.getColor('warningRed', 5), theme.colors.warningRed]
      : [theme.colors.white, theme.colors.darkBlue]
    return css`
      color: ${color};
      background-color: ${bgColor};
      /** google chrome blue background */
      -webkit-box-shadow: 0 0 0px 1000px ${bgColor} inset !important;
    `
  }};

  ${({ theme, $paddingless: paddingless }) => {
    if (paddingless) return

    return css`
      padding: ${theme.spacings.s2} ${theme.spacings.s1} ${theme.spacings.s2}
        ${theme.spacings.s3};
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
interface StyledLabelTextProps {
  $required?: boolean
}

export const LabelText = styled.label<StyledLabelTextProps>`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacings.s1};

  ${({ $required: required }) => {
    if (!required) return

    return css`
      &:after {
        content: ' *';
      }
    `
  }}
`

import styled, { css } from 'styled-components'

import { isKeyOf } from '../../../../functions/validators'

import type { LabelProps, StyledLabelContentProps } from './interfaces'

const size = '17px'

export const Checkmark = styled.div`
  position: relative;
  height: ${size};
  width: ${size};
  background-color: ${({ theme }) => theme.colors.white};

  border-style: solid;
  border-color: transparent;
  border-width: 1px;
  border-radius: 4px;

  transition-property: border-color;
  transition-duration: 0.25s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);

  &:after {
    content: '';
    position: absolute;

    left: 50%;
    top: 50%;
    height: 0;
    width: 0;

    border-style: solid;
    border-color: ${({ theme }) => theme.colors.blue};
    border-width: 0;
    transform: rotate(45deg);

    transition-property: width height border-width top left;
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  /** if there is a label, it will be placed after this element */
  + * {
    flex: 1;
  }
`

export const Label = styled.label<LabelProps>`
  ${({ theme }) =>
    theme.useTypography('p', {
      lineHeight: theme.spacings.s3,
    })}

  ${({ $padding: padding, theme }) => {
    if (!padding) return

    const _padding = {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    }

    if (padding.top) {
      _padding.top = padding.top
      if (isKeyOf(theme.spacings, padding.top)) {
        _padding.top = theme.spacings[padding.top]
      }
    }

    if (padding.left) {
      _padding.left = padding.left
      if (isKeyOf(theme.spacings, padding.left)) {
        _padding.left = theme.spacings[padding.left]
      }
    }

    if (padding.bottom) {
      _padding.bottom = padding.bottom
      if (isKeyOf(theme.spacings, padding.bottom)) {
        _padding.bottom = theme.spacings[padding.bottom]
      }
    }

    if (padding.right) {
      _padding.right = padding.right
      if (isKeyOf(theme.spacings, padding.right)) {
        _padding.right = theme.spacings[padding.right]
      }
    }

    return css`
      padding-top: ${_padding.top};
      padding-left: ${_padding.left};
      padding-right: ${_padding.right};
      padding-bottom: ${_padding.bottom};
    `
  }}

  ${({ $disabled: disabled, $readOnly: readOnly }) => {
    if (disabled) {
      return css`
        opacity: 0.5;
      `
    }

    if (readOnly) return

    return css`
      cursor: pointer;
    `
  }}

  ${({ theme, $bordered: bordered, $invalid: invalid }) => {
    if (!bordered) return
    return css`
      padding: ${theme.spacings.s2} ${theme.spacings.s3};

      border-width: 1px;
      border-style: solid;
      border-color: ${theme.colors[invalid ? 'warningRed' : 'lightGrey']};
      border-radius: 4px;
    `
  }}

  display: flex;
  align-items: center;

  user-select: none;
  min-height: ${size};
  min-width: ${size};
  gap: ${({ theme }) => theme.spacings.s1};

  > input {
    position: absolute;
    opacity: 0;
    height: 1px;
    width: 1px;
  }

  &:hover ${Checkmark} {
    background-color: ${({ theme }) => theme.colors.iceWhite};
  }
  ${({ theme, $viewMode: viewMode }) =>
    viewMode
      ? css`
          > input ~ ${Checkmark} {
            border-color: transparent;
          }
        `
      : css`
          > input ~ ${Checkmark} {
            border-color: ${theme.colors.lightestGrey};
          }
          > input:checked ~ ${Checkmark} {
            border-color: ${({ theme }) => theme.colors.blue};
          }
        `}

  > input:checked ~ ${Checkmark} {
    &:after {
      width: 5px;
      height: 9.5px;
      border-width: 0 2px 2px 0;
      left: 5px;
      top: 1px;
    }
  }

  ${({ theme, $invalid: invalid }) => {
    if (!invalid) return

    return css`
      ${Checkmark},
      > input:checked ~ ${Checkmark}, 
      > input:checked ~ ${Checkmark}:after {
        border-color: ${theme.colors.warningRed};
      }
    `
  }};

  ${({ $width: width }) => {
    return (
      width &&
      css`
        width: ${width};
      `
    )
  }}
`

export const LabelContent = styled.div<StyledLabelContentProps>`
  display: inline-block;
  ${({ theme }) =>
    theme.useTypography('p', {
      lineHeight: theme.spacings.s3,
    })}
  flex: 1;
  overflow: hidden;

  ${({ $required: required, $viewMode: viewMode }) => {
    if (!required || viewMode) return

    return css`
      &:after {
        content: ' *';
      }
    `
  }}
`

import styled, { css } from 'styled-components'

import EllipsisContainer from '../../../EllipsisContainer'

import type {
  StyledInputProps,
  StyledLabelProps,
  StyledLabelTextProps,
} from './interfaces'

export const IconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 17px;

  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
`

export const ChildrenContainer = styled(EllipsisContainer)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  line-height: 1;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
`

export const Input = styled.input<StyledInputProps>`
  ${({ theme }) => theme.useTypography('p')};

  color: ${({ theme, $invalid: invalid }) => {
    return invalid ? theme.colors.warningRed : theme.colors.darkBlue
  }};

  &::placeholder {
    color: ${({ theme, $invalid: invalid }) => {
      return invalid ? theme.colors.warningRed : theme.colors.darkGrey
    }};

    ${({ placeholder }) => {
      if (placeholder !== '••••••••') {
        return css`
          ${({ theme }) => theme.useTypography('p')};
          opacity: 1;
        `
      }

      return css`
        opacity: 0.5;
        font-size: 14px;
        letter-spacing: 0px;
      `
    }}
  }

  display: block;
  width: 100%;
  box-sizing: border-box;

  ${({ theme, $paddingless: paddingless }) => {
    if (paddingless) {
      return css`
        padding: 0;
      `
    }

    return css`
      padding: ${theme.spacings.s2} ${theme.spacings.s3};
      ~ ${ChildrenContainer} {
        padding: 0 ${theme.spacings.s3};
      }
    `
  }};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, $invalid: invalid, $borderless: borderless }) => {
    if (borderless) return 'transparent'
    return invalid ? theme.colors.warningRed : theme.colors.lightGrey
  }};
  border-radius: 4px;

  ${({ theme, $invalid: invalid }) => {
    const color = invalid ? theme.getColor('warningRed', 5) : theme.colors.white
    return css`
      background-color: ${color};
      /** google chrome blue background */
      -webkit-box-shadow: 0 0 0px 1000px ${color} inset !important;
    `
  }};

  box-shadow: none;
  outline: none;

  ${({ $arrows: arrows }) => {
    if (arrows) return

    return css`
      /* Chrome, Safari, Edge, Opera */
      &:-webkit-outer-spin-button,
      &:-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      -moz-appearance: textfield;
    `
  }}

  ${({ readOnly, onClick, disabled }) => {
    if (!readOnly || !onClick || disabled) return

    return css`
      cursor: pointer;
    `
  }}
`

export const InputContainer = styled.div<{ $width?: string }>`
  position: relative;
  width: ${({ $width: width }) => width || '100%'};
`

export const Label = styled.label<StyledLabelProps>`
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;

  color: ${({ theme }) => {
    return theme.colors.greyishBlue
  }};

  width: ${({ $width: width }) => width || '100%'};
  box-sizing: border-box;
  display: block;

  ${({ $disabled: disabled, $viewMode: viewMode }) => {
    if (!disabled || viewMode) return

    return css`
      opacity: 0.5;
    `
  }}

  > ${InputContainer} > ${IconContainer} {
    bottom: ${({ theme, $paddingless: paddingless }) => {
      return paddingless ? '2px' : `calc(${theme.spacings.s2} + 1px)`
    }};
  }

  ${({ $disabled: disabled }) => {
    if (!disabled) return

    return css`
      > ${InputContainer}:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `
  }}

  ${({ $readOnly: readOnly, $disabled: disabled, $loading: loading }) => {
    if (loading || readOnly || disabled) return

    return css`
      cursor: pointer;
    `
  }}

  ${({
    theme,
    $iconWidths: iconWidths,
    $iconPosition: position,
    $paddingless: paddingless,
  }) => {
    if (iconWidths.length < 1) return

    const width = `calc(${iconWidths.join(' + ')} + ${
      theme.spacings.s1
    } / 2 * ${iconWidths.length - 1})`

    const padding = paddingless ? '0px' : theme.spacings.s3

    if (position === 'right') {
      return css`
        > ${InputContainer} > ${IconContainer} {
          width: ${width};
          right: calc(${padding} / 2);
        }

        > ${InputContainer} > ${Input} {
          padding-right: calc(${padding} + ${width});
          ~ ${ChildrenContainer} {
            padding-right: calc(${padding} + ${width});
          }
        }
      `
    }

    return css`
      > ${InputContainer} > ${IconContainer} {
        width: ${width};
        left: calc(${padding} / 2);
      }

      > ${InputContainer} > ${Input} {
        padding-left: calc(${padding} + ${width});
        ~ ${ChildrenContainer} {
          padding-left: calc(${padding} + ${width});
        }
      }
    `
  }}
`

export const LabelText = styled.div<StyledLabelTextProps>`
  display: inline-block;

  ${({ $viewMode: viewMode }) => {
    if (!viewMode) return

    return css`
      font-weight: bold;
    `
  }}

  margin-bottom: ${({ theme, $viewMode: viewMode }) =>
    theme.spacings[viewMode ? 's3' : 's1']};

  ${({ $required: required, $viewMode: viewMode }) => {
    if (!required || viewMode) return

    return css`
      &:after {
        content: ' *';
      }
    `
  }}
`

export const ViewModeContainer = styled.div`
  ${({ children }) => {
    if (children) return

    return css`
      &:before {
        content: ' ';
        white-space: pre;
      }
    `
  }}
`

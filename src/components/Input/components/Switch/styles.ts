import styled, { css } from 'styled-components'

import type { LabelContainerProps, LabelProps } from './interfaces'

export const LabelContainer = styled.div<LabelContainerProps>`
  ${({ theme }) =>
    theme.useTypography('p', {
      lineHeight: theme.spacings.s3,
    })}
  display: flex;
  align-items: center;

  ${({ $breakLabel: breakLabel }) =>
    breakLabel &&
    css`
      width: 100%;
    `}

  ${({ $required: required, $viewMode: viewMode }) => {
    if (!required || viewMode) return
    return css`
      &:after {
        content: '*';
      }
    `
  }}

  ${({ $keepSpace: keepSpace, children }) => {
    if (!keepSpace || children) return
    return css`
      &:before {
        content: '';
        white-space: pre;
      }
    `
  }}
`

export const Label = styled.label<LabelProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  position: relative;
  align-items: center;
  flex-wrap: wrap;

  ${({ $disabled: disabled }) => {
    if (!disabled) {
      return css`
        > span {
          cursor: pointer;
        }
      `
    }
    return css`
      opacity: 0.5;
    `
  }}

  ${({ $invalid: invalid }) => {
    if (!invalid) {
      return css`
        > span:before {
          border-color: ${({ theme }) => theme.colors.lightGrey};
        }
        > input:checked + span {
          background-color: ${({ theme }) => theme.colors.blue};
        }
      `
    }
    return css`
      > span:before {
        border-color: ${({ theme }) => theme.colors.warningRed};
      }
      > input:checked + span {
        background-color: ${({ theme }) => theme.colors.warningRed};
      }
    `
  }}

  > input {
    position: absolute;
    height: 0%;
    width: 0%;
    opacity: 0;
  }

  > span {
    position: relative;
    width: 50px;
    height: calc(${({ theme }) => theme.spacings.s4} + 1px);
    background-color: ${({ theme }) => theme.colors.warningGray};
    border-radius: 20px;
    transition-property: background-color;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
    box-sizing: content-box;
    &:before {
      content: '';
      transition-property: left;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      position: absolute;
      border-width: 1px;
      border-style: solid;
      border-radius: 100%;
      left: 0;
      box-shadow: 0px 1px 3px ${({ theme }) => theme.getColor('black', 10)};
      width: calc(${({ theme }) => theme.spacings.s4} - 1px);
      height: calc(${({ theme }) => theme.spacings.s4} - 1px);
      background-color: ${({ theme }) => theme.colors.white};
    }
  }

  > input:checked + span {
    &:before {
      left: calc(100% - ${({ theme }) => theme.spacings.s4} - 1px);
    }
  }
`

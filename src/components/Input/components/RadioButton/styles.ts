import styled, { css } from 'styled-components'

import type { LabelProps } from './interfaces'

const size = '17px'

export const LabelContainer = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  display: flex;
  align-items: center;
  overflow: hidden;
`

export const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacings.s1};

  min-height: ${size};
  min-width: ${size};

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

  ${({ $required: required }) => {
    if (!required) return
    return css`
      > ${LabelContainer} {
        &:after {
          content: ' *';
        }
      }
    `
  }}

  ${({ $invalid: invalid }) => {
    if (!invalid) {
      return css`
        > span {
          border-color: ${({ theme }) => theme.colors.lightestGrey};
          &:before {
            background-color: ${({ theme }) => theme.colors.lightestGrey};
          }
        }
        > input:checked + span {
          border-color: ${({ theme }) => theme.colors.blue};
          &:before {
            background-color: ${({ theme }) => theme.colors.blue};
          }
        }
      `
    }
    return css`
      > span {
        border-color: ${({ theme }) => theme.colors.warningRed};
        &:before {
          background-color: ${({ theme }) => theme.colors.warningRed};
        }
      }
    `
  }}

  > input {
    position: absolute;
    height: 1px;
    width: 1px;
    opacity: 0;

    /* Appearance (General) */
    appearance: none;
    /* Appearance (Chrome, Safari, Edge, Opera) */
    &:-webkit-outer-spin-button,
    &:-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Appearance (Firefox) */
    -moz-appearance: none;
  }

  > span {
    align-self: center;
    height: 17px;
    width: 17px;
    min-height: 17px;
    min-width: 17px;
    max-height: 17px;
    max-width: 17px;
    border-radius: 100%;
    border-width: 1px;
    border-style: solid;
    background-color: ${({ theme }) => theme.colors.white};
    position: relative;
    transition-property: border-color;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      height: 0;
      width: 0;
      border-radius: 100%;
      transition-property: top, left, width, height, background-color;
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
  }
  > input:checked + span {
    &:before {
      top: calc(50% - 4.5px);
      left: calc(50% - 4.5px);
      height: 9px;
      width: 9px;
    }
  }
`

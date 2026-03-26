import styled, { css } from 'styled-components'

import type { LabelProps, TagContainerProps } from './interfaces'

export const Label = styled.label<LabelProps>`
  ${({ theme }) => theme.useTypography('p')};

  color: ${({ theme }) => {
    return theme.colors.greyishBlue
  }};

  width: ${({ $width: width }) => width || '100%'};
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;

  ${({ $disabled: disabled }) => {
    if (!disabled) return

    return css`
      opacity: 0.5;
    `
  }}
`

export const TagContainer = styled.div<TagContainerProps>`
  display: flex;
  flex-wrap: wrap;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ $borderless: borderless, theme, $invalid: invalid }) => {
    if (!borderless) {
      return css`
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
        border-color: ${theme.colors[invalid ? 'warningRed' : 'lightGrey']};
      `
    }
  }};

  ${({ theme, $paddingless: paddingless }) => {
    if (paddingless) {
      return css`
        padding: 0;
        > input {
          padding: 0;
        }
      `
    }

    return css`
      padding: ${theme.spacings.s1};
    `
  }};
`

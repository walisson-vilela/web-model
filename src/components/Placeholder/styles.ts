import styled, { css } from 'styled-components'

import type { HeaderLineProps } from './interfaces'

export const HeaderLine = styled.div<HeaderLineProps>`
  height: ${({ $height: height }) => height};
  background-color: #ebebeb;
  margin-left: 7px;

  & + div {
    margin-top: 14px;
  }

  ${({ $size: size }) =>
    size === 'mini' &&
    css`
      width: 15%;
    `}

  ${({ $size: size }) =>
    size === 'small' &&
    css`
      width: 25%;
    `}

  ${({ $size: size }) =>
    size === 'medium' &&
    css`
      width: 45%;
    `}

  ${({ $size: size }) =>
    size === 'large' &&
    css`
      width: 75%;
    `}
`

import styled, { css } from 'styled-components'

import type { HeaderLineProps } from '../../interfaces'

export const Container = styled.div`
  width: 100%;
  max-height: 100%;
  position: absolute;
  padding: 14px;
`
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
export const Template4Container = styled(Container)`
  border: 1px solid #e6e6e7;
  border-radius: 4px;
`
export const CustomLine = styled(HeaderLine)`
  width: ${({ $width: width }) => width};
  height: ${({ $height: height }) => height};
  background-color: ${({ $color: color }) => color};
`

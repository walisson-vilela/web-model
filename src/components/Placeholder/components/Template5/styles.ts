import styled, { css } from 'styled-components'

import type { HeaderLineProps } from '../../interfaces'

export const Container = styled.div`
  position: absolute;
  width: 746px;
  height: 169px;
  border: 1px solid #e6e6e7;
  border-radius: 4px;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Circle = styled.div`
  width: 141px;
  height: 141px;
  background-color: #dddedf;
  border-radius: 50%;
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

export const CustomLine = styled(HeaderLine)`
  width: ${({ $width: width }) => width};
  height: ${({ $height: height }) => height};
  background-color: ${({ $color: color }) => color};
`

export const MainContent = styled.div`
  flex: 1;
  margin-left: 35px;
`

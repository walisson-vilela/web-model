import styled, { css } from 'styled-components'

import type { HeaderLineProps } from '../../interfaces'

export const Container = styled.div`
  width: 395px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5 0% 0% no-repeat padding-box;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px;
  width: 100%;
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
  background-color: ${({ $width: color }) => color};
  border: 1px solid #dedede5e;
`

export const Main = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`
export const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ebebeb;
  border-radius: 50%;
  margin: 0 16px;
`

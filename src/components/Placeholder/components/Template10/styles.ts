import styled, { css } from 'styled-components'

import type { HeaderLineProps } from '../../interfaces'

export const Container = styled.div`
  width: 395px;
  height: 245px;
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
    margin-top: 7px;
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

export const GraphLine = styled(CustomLine)`
  margin: 0 7px;
`

export const Main = styled.div`
  flex: 1;
  padding: 0 7px 72px 7px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`

export const Circle = styled.div`
  width: 128px;
  height: 128px;
  background-color: #ebebeb;
  border-radius: 50%;
`

import styled, { css } from 'styled-components'

import type { HeaderLineProps } from '../../interfaces'

export const Container = styled.div`
  width: 395px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px;
`

export const Footer = styled.div`
  width: 100%;
  border-top: 1px solid #b1b1b3;
  height: 50px;
`

export const HeaderLine = styled.div<HeaderLineProps>`
  height: ${({ $height: height }) => height};
  background-color: #ebebeb;
  margin-left: 7px;

  & + div {
    margin-top: 14px;
  }

  ${(props) =>
    props.$size === 'mini' &&
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

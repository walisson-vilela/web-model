import styled, { css } from 'styled-components'

import type { HeaderLineProps } from '../../interfaces'

export const Container = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  padding: 14px;
`

export const Header = styled.div`
  display: flex;
`

export const HeaderImage = styled.div`
  width: 43px;
  height: 44px;
  background-color: #ebebeb;
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`

export const MainContent = styled.div`
  margin-top: 8px;
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

export const MainLine = styled(HeaderLine)<HeaderLineProps>`
  margin-bottom: 14px;
  margin-left: 0;
`

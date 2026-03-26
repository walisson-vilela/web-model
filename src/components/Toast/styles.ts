import styled, { css } from 'styled-components'

import type { StyledToasterProps } from './interfaces'

export const Container = styled.div<StyledToasterProps>`
  border-radius: 4px;
  width: ${({ $size: size }) => (size === 'large' ? '837px' : '460px')};
  height: 88px;
  border: 1px solid transparent;
  position: relative;

  ${({ $color: color }) =>
    color === 'success' &&
    css`
      background-color: #fcfff5;
      opacity: 1;
      border-color: #a8c599;
      h4 {
        color: #1e561f;
      }
      p {
        color: #1e561fcc;
      }
    `}

  ${({ $color: color }) =>
    color === 'error' &&
    css`
      background-color: #fff6f6;
      opacity: 1;
      border-color: #973937;
      h4 {
        color: #973937;
      }
      p {
        color: #973937;
      }
    `}

  ${({ $color: color }) =>
    color === 'warning' &&
    css`
      background-color: #fffaf3;
      opacity: 1;
      border-color: #ccbea0;
      h4 {
        color: #7a4d05;
      }
      p {
        color: #7a4d05cc;
      }
    `}

  svg {
    cursor: pointer;
    position: absolute;
    top: 14px;
    right: 14px;
    width: 13px;
    height: 13px;
  }
`

export const IconContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 14px 14px 0 0;
  margin: 0;
`

export const IconContent = styled.div`
  width: 100%;
  padding: 13px 0 21px 28px;
  display: flex;
  flex: 1;
  flex-direction: column;

  h4 {
    margin-bottom: 7px;
    font-size: 18p;
  }
  p {
    margin: 0;
    font-size: 14px;
    max-width: 380px;
  }
`

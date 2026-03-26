import styled, { css } from 'styled-components'

import type { StyledCardProps } from './interfaces'

export const Container = styled.div<StyledCardProps>`
  width: 100%;
  background: #fff;
  border: 1px solid #d4d4d5;
  border-radius: 4px;
  border-left-width: 5px;
  padding: 14px;

  ${({ $size: size }) =>
    size === 'mini' &&
    css`
      width: 394px;
      height: 99px;
    `}

  ${({ $size: size }) =>
    size === 'small' &&
    css`
      width: 394px;
      height: 131px;
    `}
    
  ${({ $size: size }) =>
    size === 'medium' &&
    css`
      width: 394px;
    `}

  ${({ $size: size }) =>
    size === 'big' &&
    css`
      width: 414px;
      height: 324px;
    `}

  ${({ $borderType: borderType }) =>
    borderType === 'info' &&
    css`
      border-left-color: #4d6dbe;
    `}

  ${({ $borderType: borderType }) =>
    borderType === 'success' &&
    css`
      border-left-color: #66bb6a;
    `}

  ${({ $borderType: borderType }) =>
    borderType === 'warning' &&
    css`
      border-left-color: #fbcb01;
    `}

  ${({ $borderType: borderType }) =>
    borderType === 'danger' &&
    css`
      border-left-color: #e23851;
    `}

  ${({ $borderType: borderType }) =>
    borderType === 'none' &&
    css`
      border: 1px solid #d4d4d5;
    `}
`

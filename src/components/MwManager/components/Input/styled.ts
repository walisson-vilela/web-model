import styled, { css } from 'styled-components'

interface ContainerProps {
  $fluid?: boolean
  $transparent?: boolean
  $disabled?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: inline-flex;
  align-items: center;

  ${({ $fluid }) =>
    $fluid &&
    css`
      width: 100%;
      display: flex;
    `}

  ${({ $transparent }) =>
    $transparent &&
    css`
      input {
        border: none !important;
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: default;
    `}
`

interface InputProps {
  $hasIcon: boolean
}

export const Input = styled.input<InputProps>`
  font-size: 14px;
  line-height: 17px;
  width: 100%;

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      padding-right: calc(var(--mw-input-icon-size) + 17px) !important;
    `}

  &::placeholder {
    color: #999999 !important;
    opacity: 1;
  }
`

export const IconContainer = styled.div`
  position: absolute;
  top: calc(50% - (var(--mw-input-icon-size) / 2));
  right: 10px;

  svg {
    width: var(--mw-input-icon-size);
    height: var(--mw-input-icon-size);
  }
`

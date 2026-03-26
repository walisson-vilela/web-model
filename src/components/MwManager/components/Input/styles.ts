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
  width: 100%;

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
        background: transparent;
        height: 17px;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
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
  box-sizing: border-box;
  height: 32px;

  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  background: #fff;

  font-size: 14px;
  line-height: 17px;
  width: 100%;

  padding: 0 10px;

  outline: none;
  appearance: none;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      padding-right: calc(var(--mw-input-icon-size) + 24px) !important;
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
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: var(--mw-input-icon-size);
    height: var(--mw-input-icon-size);
  }
`

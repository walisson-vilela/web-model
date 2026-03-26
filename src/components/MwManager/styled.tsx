import styled, { css } from 'styled-components'

import Input from './components/Input'

export { Input }

export interface TransparentButtonProps {
  /** aparencia do botao */
  appearance?: 'disabled' | 'opacity'
  occult?: boolean
}

export type StyledTransparentButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    $appearance?: TransparentButtonProps['appearance']
    $occult?: TransparentButtonProps['occult']
  }

const apperances = {
  disabled: css`
    color: #999999 !important;
    cursor: auto !important;
    svg {
      color: #999999;
    }
  `,
  opacity: css`
    color: #999999 !important;
  `,
}

export const TransparentButton = styled.button<StyledTransparentButtonProps>`
  cursor: pointer;

  user-select: none;

  width: 100%;
  background-color: transparent;
  border: none;
  text-align: inherit;
  padding: 0;

  ${({ $appearance: appearance }) => {
    if (
      appearance &&
      Object.prototype.hasOwnProperty.call(apperances, appearance)
    ) {
      return apperances[appearance]
    }
    return undefined
  }}

  ${({ $occult: occult }) => {
    if (!occult) return css``
    return css`
      visibility: hidden;
    `
  }}

  &:disabled {
    ${apperances.disabled}
  }
`
export const ThemeContainer = styled.div`
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }

  i,
  i.icon,
  i.icons {
    margin-right: 0;
  }

  svg {
    color: #999999;
  }
`

export const scrollbar = css`
  scroll-behavior: smooth;
  @supports not selector(::-webkit-scrollbar) {
    scrollbar-color: #adadad #f9f8f8;
    scrollbar-width: thin;
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: #adadad;
  }
  &::-webkit-scrollbar-track {
    background: #f9f8f8;
  }
`

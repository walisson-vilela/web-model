import { Input as SemanticInput } from 'semantic-ui-react'
import styled, { createGlobalStyle } from 'styled-components'

interface IsDisabled {
  isDisabled: boolean
}

export const Content = styled.div<IsDisabled>`
  display: flex;
  flex-direction: column;
  gap: 7px;
  & > b {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: #263046;
    width: 100%;
    opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
    cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  }
`

export const Input = styled(SemanticInput)`
  width: 100%;

  :disabled {
    opacity: 0.5 !important;
  }

  &.ui.input {
    & > input:not([type]),
    & > input[type='date'],
    & > input[type='datetime-local'],
    & > input[type='email'],
    & > input[type='file'],
    & > input[type='number'],
    & > input[type='password'],
    & > input[type='search'],
    & > input[type='tel'],
    & > input[type='text'],
    & > input[type='time'],
    & > input[type='url'] {
      padding: 8px 14px !important;
      line-height: 14px;
      font-size: 14px;
      border: 0;
      width: 100% !important;
    }

    &.icon {
      & > input:not([type]),
      & > input[type='date'],
      & > input[type='datetime-local'],
      & > input[type='email'],
      & > input[type='file'],
      & > input[type='number'],
      & > input[type='password'],
      & > input[type='search'],
      & > input[type='tel'],
      & > input[type='text'],
      & > input[type='time'],
      & > input[type='url'] {
        padding-right: 40px !important;
      }
    }
  }
`

export const Container = styled.div<IsDisabled>`
  position: relative;
  border: 1px solid
    ${(props) => (props.isDisabled ? 'rgba(200, 200, 200, .5)' : '#c8c8c8')};
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between;
  border-radius: 5px;
  background: transparent;
  font-size: 1em !important;
  padding-right: 6px !important;
  width: 100%;
`

export const PasswordMask = styled.div`
  position: absolute;
  top: 7px;
  left: 15px;
  font-family: 'password';
  opacity: 0.5;
  font-size: 12px;
  letter-spacing: 2.25px;
`

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'password';
    font-style: normal;
    font-weight: 400;
    src: url(https://jsbin-user-assets.s3.amazonaws.com/rafaelcastrocouto/password.ttf);
  }
`

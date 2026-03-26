import { Button, Form as SemanticForm } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled.div`
  height: 438px;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  padding: 21px;
  font-size: 18px;
  font-weight: bold;
  background-color: #3455ab;
  color: white;
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 21px;
  max-height: 315px;

  label {
    color: #263046 !important;
    font-size: 14px !important;
    font-weight: normal !important;
    margin-bottom: 7px !important;
  }

  small {
    display: block;
    margin-top: 7px;
    color: #c70101;
    font-weight: normal;
    font-size: 14px;
  }

  .field {
    margin-bottom: 35px !important;
  }

  .form-field {
    width: 294px !important;
  }
`

export const Footer = styled.footer`
  border-top: 1px solid #e6e6e7;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 14px;
  background: #ffffff;

  .button {
    margin: 0px 14px 0px 0px !important;
  }

  .button:last-child {
    margin: 0px !important;
  }
`

export const StoreItem = styled.div`
  > p {
    font-weight: normal;
    color: #192338;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > p:first-child {
    font-size: 14px;
    margin-bottom: 3.5px;
  }

  > p:last-child {
    font-size: 13px;
  }
`

export const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 28px 28px 0 0;

  > div {
    display: flex;
    align-items: center;

    > span {
      padding-right: 14px;
      margin-bottom: 7px;
    }
  }
`

export const Form = styled(SemanticForm)`
  &.ui.form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .fields {
      .field {
        margin-bottom: 0 !important;

        :first-child {
          padding-left: 0 !important;
        }
        :last-child {
          padding-right: 0 !important;
        }
      }
    }

    > .fields,
    > .field {
      margin: 0 !important;
    }
  }
`

export const SubmitButton = styled(Button)`
  &.ui.button,
  &.ui.blue.button:not(.basic),
  &.ui.primary.button,
  &.ui.blue.buttons .button {
    width: 105px;
    border: 1px solid transparent !important;
  }
`

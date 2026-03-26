import { Modal, Input as SemanticInput } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export const ModalHeader = styled(Modal.Header)`
  padding: 21px !important;
  font-size: 18px !important;
  font-weight: bold !important;
  background-color: #3455ab !important;
  color: white !important;
`

export const ModalContent = styled(Modal.Content)`
  min-height: 220px;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const Input = styled(SemanticInput)`
  input {
    padding-right: 2.67142857em !important;
  }
`

export const LabelContainer = styled.div`
  display: block;
  margin-bottom: 0.28571429rem;
`

interface LabelProps {
  error?: boolean
  required?: boolean
}

export const Label = styled.span<LabelProps>`
  ${(props) =>
    props.error &&
    css`
      color: #9f3a38;
    `}
  ${(props) =>
    props.required &&
    css`
      :after {
        content: ' *';
      }
    `}
`

export const Error = styled.span`
  display: block;
  margin-top: 7px;
  color: #c70101;
`

export const Title = styled.h3`
  color: #263046;
  font-size: 20px;
  margin-bottom: 28px;
  margin-top: 14px !important;
`

import { Modal as SemanticModal } from 'semantic-ui-react'
import styled from 'styled-components'

export const Modal = styled(SemanticModal)``

export const ModalHeader = styled(SemanticModal.Header)`
  padding: 21px !important;
  width: 100% !important;
  background-color: #3455ab !important;
  color: #fff !important;
  font: normal normal bold 18px/20px Lato !important;
  display: flex !important;
  align-items: center !important;
`

export const Main = styled(SemanticModal.Content)`
  display: flex !important;
  flex-direction: column;
  height: 50vh;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const Footer = styled.footer`
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #dadadb;
`

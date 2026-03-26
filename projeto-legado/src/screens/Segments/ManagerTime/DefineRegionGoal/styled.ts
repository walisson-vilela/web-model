import { Modal as SemanticModal } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalHeader = styled(SemanticModal.Header)`
  padding: 21px !important;
  font-size: 18px !important;
  font-weight: bold !important;
  background-color: #3455ab !important;
  color: white !important;
`

export const Modal = styled(SemanticModal)`
  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const Title = styled.div`
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 21px;
  padding-left: 7px;
  color: #263046cc;
`

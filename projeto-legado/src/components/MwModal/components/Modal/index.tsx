import { Modal as SemanticModal, StrictModalProps } from 'semantic-ui-react'
import styled from 'styled-components'

const Modal = styled(SemanticModal as React.ComponentClass<StrictModalProps>)`
  &&.ui.modal {
    display: flex !important;
    flex-direction: column;
  }
`

export default Modal

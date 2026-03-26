import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalActions = styled(Modal.Actions)`
  .ui.modal > &&.actions,
  &&.actions {
    display: flex;
    gap: ${({ theme }) => theme.spacings.s3};
    justify-content: end;

    > button,
    > button.ui.button {
      margin-left: 0;
    }
  }
`

import styled from 'styled-components'

import Modal from '../../../../../../../components/MwModal'

export const Footer = styled(Modal.Footer)`
  .ui.modal > &&.actions,
  &&.actions {
    display: flex;
    justify-content: space-between;

    > :nth-child(1) {
      color: ${({ theme }) => theme.getColor('greyishBlue', 70)};
    }
  }
`

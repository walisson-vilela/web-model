import { Modal } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const ModalHeaderText = styled(Modal.Header)`
  font-size: 18px !important;
  font-weight: bold !important;
  background-color: #3455ab !important;
  color: white !important;
`

export const ModalDescriptionText = styled.div`
  width: 100%;

  & > span {
    font: normal normal medium 16px/24px Lato;
    color: #263046cc;

    & > strog {
      font: normal normal bold 16px/24px Lato;
      color: #263046cc;
    }
  }
  margin-bottom: 21px;
`

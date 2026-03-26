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
  width: 88rem !important;
  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const ModalActions = styled(SemanticModal.Actions)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacings.s3};
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacings.s1};
  justify-content: space-between;
`

export const Title = styled.span`
  font-size: 16px;
  font-weight: bolder;
  color: #263046cc;
`

export const Text = styled.div`
  width: 100%;
  height: 250px;
  display: flex;

  #toolbar {
    padding-left: 0;
    padding-right: 0;
  }
`

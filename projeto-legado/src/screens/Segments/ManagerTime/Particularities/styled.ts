import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalHeader = styled(Modal.Header)`
  padding: 21px !important;
  font-size: 18px !important;
  font-weight: bold !important;
  background-color: #3455ab !important;
  color: white !important;
`

export const Toolbar = styled.div`
  margin-bottom: 21px;
  display: flex;
`

export const ToolbarTitle = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #263046cc;
`

export const ToolbarCell = styled.div`
  padding: 0 7px 0 0;
  display: flex;
  align-items: center;
  position: relative;

  :first-child {
    margin-right: auto;
  }
`

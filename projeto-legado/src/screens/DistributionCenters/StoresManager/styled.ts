import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

export const ColContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;

  :first-child {
    padding-right: 7px;
  }
  :last-child {
    padding-left: 7px;
  }
`

export const TableContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  overflow: hidden;
`

export const Title = styled.div`
  font-size: 16px;
  color: #162d48;
  padding-bottom: 14px;
`

export const ModalHeader = styled(Modal.Header)`
  padding: 21px !important;
  font-size: 18px !important;
  font-weight: bold !important;
  background-color: #3455ab !important;
  color: white !important;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 7px;

  .btn-add {
    background-color: #3455ab !important;
    color: #fff !important;
  }
`

interface BoldTextInterface {
  weight?: '600' | '900' | 'bold' | 'bolder' | 'normal'
}
export const BoldText = styled.b<BoldTextInterface>`
  font-weight: ${(props) => props.weight || '600'};
`

import { Modal as SemanticModal } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalHeader = styled(SemanticModal.Header)`
  padding: 21px !important;
  font-size: 18px !important;
  font-weight: bold !important;
  background-color: #3455ab !important;
  color: white !important;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
`

export const Title = styled.div`
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 21px;
  padding-left: 7px;
  color: #263046cc;
`

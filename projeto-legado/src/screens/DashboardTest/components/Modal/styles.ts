import { Modal as SemanticModal } from 'semantic-ui-react'
import styled from 'styled-components'

export const Modal = styled(SemanticModal)`
  padding: 16px;
  width: 100%;
  max-width: 1366px;
  height: 768px;
`

export const ChildrenWrapper = styled.div`
  display: flex;
  flex: 1 !important;
  flex-direction: column !important;
  border: 0 !important;

  .header-children {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between !important;
  }

  .close.icon {
    cursor: pointer !important;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .close.icon {
    cursor: pointer !important;
  }
`

export const Content = styled.div`
  margin-top: 20px;
  flex: 1 !important;
`

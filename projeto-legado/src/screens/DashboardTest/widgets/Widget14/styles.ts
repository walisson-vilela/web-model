import { CardGroup, Dimmer, Modal as SemanticModal } from 'semantic-ui-react'
import styled from 'styled-components'

export const Wrapper = styled(CardGroup)`
  padding: 1rem !important;
  border: 0 !important;

  .ui.card {
    box-shadow: none !important;
  }

  .ui.fluid.raised.card.dimmable.modal-dimmer {
    border: 0 !important;
  }
`
export const WidgetDimmerWrapper = styled(Dimmer)`
  background-color: #fff !important;
  opacity: 1 !important;
  border: 0 !important;
  z-index: 1 !important;

  > div.content {
    width: 100%;
    border-top: none !important;
  }
`

export const Modal = styled(SemanticModal)`
  padding: 16px;
  width: 100%;
  max-width: 1366px;
  height: 768px;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .close.icon {
    cursor: pointer !important;
  }
`

export const Content = styled.div`
  flex: 1;
  margin-top: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

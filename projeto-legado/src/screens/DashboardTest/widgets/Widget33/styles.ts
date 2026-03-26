import { CardGroup, Modal as SemanticModal } from 'semantic-ui-react'
import styled from 'styled-components'

export const ButtonGroupWrapper = styled.div`
  .btn-wrapper .ui.button {
    min-width: 100px !important;
    height: 30px !important;
    margin: 4px 0 !important;
    border-radius: 4px !important;
    border: 1px solid #000 !important;
    background: transparent !important;
    color: #000 !important;
  }

  .btn-wrapper .ui.button.active {
    background-color: rgb(52, 85, 171) !important;
    color: #fff !important;
    border: 1px solid rgb(52, 85, 171) !important;
  }
`

export const Modal = styled(SemanticModal)`
  width: 100%;
  max-width: 1366px !important;
  padding: 16px;
`

export const Wrapper = styled(CardGroup)`
  width: 100%;
  padding: 1rem !important;
  border: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: center;

  .ui.card {
    box-shadow: none !important;
  }

  .ui.fluid.raised.card.dimmable.modal-dimmer {
    border: 0 !important;
  }
`
export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .close.icon {
        cursor: pointer !important;
    }import { withCookies } from 'react-cookie';

`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

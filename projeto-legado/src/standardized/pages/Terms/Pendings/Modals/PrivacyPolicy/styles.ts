import { Modal, ModalProps } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export const Container = styled(Modal as React.ComponentClass<ModalProps>)`
  width: 709px !important;
  height: 500px !important;
`

export const Header = styled.div`
  padding: 21px 0 22px 21px !important;
  color: #192338 !important;
  font-weight: bold !important;
  font-size: 18px !important;
  border-bottom: 1px solid #dadadb !important;
  ${({ children }) =>
    !children &&
    css`
      :after {
        content: ' ';
        white-space: pre;
      }
    `}
`

export const Main = styled.div`
  height: 370px;
  padding: 21px !important;
  position: relative;
  display: flex;
  flex-direction: column;

  > div {
    overflow: hidden auto;
    > div {
      overflow: initial;
      height: auto;
    }
  }

  .ui.active.loader {
    &::after {
      border-left-color: #3455ab !important;
    }
  }
`

export const Footer = styled.div`
  height: 67px;
  border-top: 1px solid #dadadb;
  display: flex;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0 22px;
  input[type='checkbox'] {
    color: #3455ab;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    .ui.button {
      width: 130px !important;
      height: 41px !important;

      & + button {
        background-color: #3455ab !important;
        color: #fff;
      }
    }
  }
`

export const FooterContent = styled.div`
  width: 100%;
  justify-content: flex-end;
`

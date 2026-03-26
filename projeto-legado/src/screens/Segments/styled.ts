import { Modal, ModalHeaderProps } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

interface StyledModalHeaderProps extends ModalHeaderProps {
  color?: 'blue'
}

const colors = {
  blue: css`
    background-color: #3455ab !important;
    color: #fff !important;
  `,
}

export const ModalHeader = styled(Modal.Header)<StyledModalHeaderProps>`
  ${(props) => {
    if (props.color) return css``
    return colors[props.color]
  }}
`

export const Link = styled.a`
  cursor: pointer;
  color: inherit;

  :hover {
    color: inherit;
    text-decoration: underline;
  }
`

// estilos para usar o manager dentro do modal

export const Content = styled(Modal.Content)`
  display: flex !important;
  flex-direction: column;
  height: inherit;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const Toolbar = styled.div`
  margin-bottom: 21px;
  display: flex;
`

export const ToolbarTitle = styled.div`
  color: #263046cc;
  font-size: 16px;
`

export const ToolbarCell = styled.div`
  padding: 0 7px;
  display: flex;
  align-items: center;
  position: relative;

  :first-child {
    margin-right: auto;
  }
`

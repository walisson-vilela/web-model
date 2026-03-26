import { Modal, ModalProps, Button as SemanticButton } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled(Modal as React.ComponentClass<ModalProps>)`
  width: 500px !important;
  height: 235px !important;
`

export const Header = styled.div`
  padding: 27px 0 21px 28px;
  font-size: 20px;
  color: #263046;
  font-weight: bold;
  border-bottom: 1px solid #dadadb;
`

export const Content = styled.section`
  padding: 24px 28px;
  color: #263046;
  opacity: 70%;
  border-bottom: 1px solid #e4e4e4;
  line-height: 24px;
`

export const Footer = styled.div`
  padding: 14px 14px 14px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const Button = styled(SemanticButton)`
  width: 100% !important;
  max-width: 110px !important;
  height: 41px !important;
  border-radius: 4px !important;
  background-color: #3455ab !important;
  padding-bottom: 14px !important;
  color: #fff !important;
  margin-right: 0px;
`

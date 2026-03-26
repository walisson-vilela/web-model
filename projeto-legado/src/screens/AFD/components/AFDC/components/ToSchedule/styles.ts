import { Button as SemanticButton } from 'semantic-ui-react'
import styled from 'styled-components'

export const Subtitle = styled.p`
  font-size: 13px;
  font-weight: 900;
  color: #000000cc;
  margin: 14px 0;
`

export const Empty = styled.div`
  padding-top: 49px;
  display: flex;
  justify-content: center;
`

export const TableContainer = styled.div`
  min-height: 119px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;

  table {
    border: none !important;
  }
`
export const Button = styled(SemanticButton)`
  height: 35px;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
`

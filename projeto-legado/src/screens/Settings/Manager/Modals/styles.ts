import { Button as SemanticButton } from 'semantic-ui-react'
import styled from 'styled-components'

export const Button = styled(SemanticButton)`
  &.ui.button,
  &.ui.blue.button:not(.basic),
  &.ui.primary.button,
  &.ui.blue.buttons .button {
    width: 105px;
    border: 1px solid transparent !important;
  }
`

export const Error = styled.small`
  font-size: 14px;
  color: #c70101;
`

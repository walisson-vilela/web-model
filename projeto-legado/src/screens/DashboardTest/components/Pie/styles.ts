import { Card, Dimmer } from 'semantic-ui-react'
import styled from 'styled-components'

export const PieWrapper = styled(Card)``

export const PieDimmerWrapper = styled(Dimmer)`
  background-color: #fff !important;
  opacity: 1 !important;
  z-index: 1 !important;

  > div.content {
    width: 100%;
    border-top: none !important;
  }
`

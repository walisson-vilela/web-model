import { Card, Dimmer } from 'semantic-ui-react'
import styled from 'styled-components'

export const ColumnsWrapper = styled(Card)`
  box-shadow: 0 !important;
  border: 0 !important;

  .widget18 {
    margin: 0 !important;
  }
  .widget13 {
    margin: 0 !important;
  }
`

export const ColumnsDimmerWrapper = styled(Dimmer)`
  background-color: #fff !important;
  opacity: 1 !important;
  box-shadow: 0 !important;
  border: 0 !important;
  z-index: 1 !important;

  > div.content {
    width: 100%;
    border-top: none !important;
  }
  .ui.card {
    box-shadow: none !important;
    border: 0 !important;
  }

  .ui.fluid.raised.card.dimmable.modal-dimmer {
    border: 0 !important;
  }

  .widget18 {
    margin: 0 !important;
  }

  ..ui.fluid.raised.card.dimmable.widget19 {
    margin-bottom: 9px !important;
  }
`

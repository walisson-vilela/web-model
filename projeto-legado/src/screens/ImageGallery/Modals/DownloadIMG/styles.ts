import styled from 'styled-components'

import { Grid } from '../../../../components/FormFields'

export const GridRow = styled(Grid.Row)`
  > div {
    width: 100%;
  }
`

export const QualityPopup = styled.div`
  ul {
    margin: 0;
    padding-left: 20px;
  }

  p {
    margin-bottom: 7px;
  }
`

export const ExtractionTypePopup = styled.div`
  p:not(:last-child) {
    margin-bottom: 3.5px;
  }

  div:not(:last-child) {
    margin-bottom: 14px;
  }
`

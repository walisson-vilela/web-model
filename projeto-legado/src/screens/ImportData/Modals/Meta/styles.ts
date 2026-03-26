import styled from 'styled-components'

import { Grid } from '../../../../components/FormFields'

export const Title = styled.h5`
  text-align: left;
  font: normal normal 600 16px/24px Lato;
  letter-spacing: 0px;
  color: #192338;
  margin-bottom: 28px !important;
`

export const ImportContainer = styled(Grid.Row)`
  border: 1px solid #e2e2e3;
  border-radius: 4px;
  padding: 14px 21px;
  margin-bottom: 21px;

  & > * {
    border-right: 1px solid #e2e2e3;
  }

  & > *:last-child {
    border: none;
  }
`
export const DivComponents = styled.div`
  > label {
    margin-top: 14px;
  }
`

export const Input = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #192338;
`
export const Divcontainer = styled.div`
  height: 300px;
`

export const Label = styled.div`
  padding-bottom: 14px;
  font-size: 18px;
  font-weight: bold;
  color: #192338;
`

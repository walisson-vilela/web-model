import styled from 'styled-components'

import { Grid } from '../../../../components/FormFields'

export const Title = styled.span`
  font: normal normal 600 16px/24px Lato;
  letter-spacing: 0px;
  color: #192338;
`

export const StyledGridRow = styled(Grid.Row)`
  border: 1px solid #e2e2e3;
  height: calc(100% - 32px);
  margin-top: 28px !important;
`

export const ItemLabel = styled.b`
  font-size: 18px;
  color: #263046;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  border-bottom: 1px solid #e2e2e3;
`

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const Item = styled.div`
  border-bottom: 1px solid #e2e2e3;
  padding: 14px;
`

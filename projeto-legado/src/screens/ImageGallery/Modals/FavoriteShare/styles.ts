import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled.div`
  height: 475px;
  display: flex;
  flex-direction: column;
`

export const ManagerContainer = styled.div`
  margin-top: 21px;
  flex: 1;
  height: calc(100% - 126.9px);

  > div:last-child {
    height: calc(100% - 46.72px);
  }
`

export const Title = styled.p`
  margin: 0;
  font-size: 16px;
  color: #162d48;
`

export const GridRow = styled(Grid.Row)`
  margin-top: 7px;

  > div {
    width: 100%;
  }
`

export const TableContent = styled.div`
  p {
    margin: 0;
    color: #192338;

    &:first-child {
      font-size: 14px;
      padding-bottom: 3.5px;
    }

    &:last-child {
      font-size: 13px;
      opacity: 0.5;
    }
  }
`

export const FiltersContainer = styled.div`
  margin: 0 !important;
  display: flex;
  align-items: center;
  position: relative;

  > * {
    padding: 0 14px;
    border-left: 1px solid #e2e2e3;
    height: 39px;
    display: flex;
    align-items: center;
  }
`

export const PopupText = styled.div`
  p {
    margin-bottom: 7px;
  }
`

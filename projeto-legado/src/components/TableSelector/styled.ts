import { Table, TableProps } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  table.ui.table {
    margin: 0;
    border-collapse: collapse;

    overflow: hidden;
    display: flex;
    flex-direction: column;

    position: relative;
    border-radius: 0;

    tr:first-child {
      border-top: 0;
    }
  }

  table.ui.table:first-child {
    border-radius: 4px 4px 0 0 !important;
  }
  table.ui.table:last-child {
    border-radius: 0 0 4px 4px !important;
  }
`

type TableComponent = React.FunctionComponent<TableProps>
export const OptionsTable = styled(Table as never as TableComponent)`
  flex: 1;
  border-top: 0 !important;
`

export const TableRow = styled(Table.Row)`
  border-top: 1px solid #e2e2e3;
  display: flex;

  &:nth-child(even) {
    background-color: #fafafb;
  }
`

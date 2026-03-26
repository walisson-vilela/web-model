import { Table as SemanticTable, TableProps } from 'semantic-ui-react'
import styled from 'styled-components'

export const TableBody = styled(SemanticTable.Body)`
  overflow-y: auto;
  position: relative;
  flex: 1;
`

type TableComponent = React.FunctionComponent<TableProps>
export const Table = styled(SemanticTable as never as TableComponent)`
  height: 100%;
  display: flex;
  flex-direction: column;

  tr {
    display: flex;
  }
`

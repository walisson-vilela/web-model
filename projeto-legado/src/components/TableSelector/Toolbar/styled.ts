import {
  Checkbox as SemanticCheckbox,
  Table,
  TableProps,
} from 'semantic-ui-react'
import styled from 'styled-components'

export const SearchFilterCell = styled(Table.Cell)`
  padding: 13px 16px !important;
`

export const Checkbox = styled(SemanticCheckbox)`
  label {
    color: #00000066 !important;
    font-weight: bolder;
  }
`

export const CheckboxCell = styled(Table.Cell)`
  display: flex;
  align-items: center;
  flex: 1;
`

export const FiltersContainer = styled(Table.Cell)`
  margin: 0 !important;
  display: flex;
  align-items: center;
  position: relative;
  height: 45.47px;
`

type TableComponent = React.FunctionComponent<TableProps>
export const StyledTable = styled(Table as never as TableComponent)`
  overflow: visible !important;
`

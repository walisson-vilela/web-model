import { Table } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const TableCell = styled(Table.Cell)`
  overflow: hidden;
  padding: 7px 14px !important;
  border: 0 !important;
  position: relative;
`

export const CheckboxCell = styled(TableCell)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7px 14px !important;
`

export const RadioCell = styled(TableCell)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7px 0 7px 14px !important;
`

export const TableButtonCell = styled(Table.Cell)`
  padding-left: 0px !important;
  padding-right: 0px !important;
  position: relative;
`

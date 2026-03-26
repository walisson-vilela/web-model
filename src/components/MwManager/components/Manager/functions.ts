import type { ColumnInterface, ContextInterface, Row, SelectionInterface } from './interfaces'
import type { SortState } from './Sort/interfaces'

export const isRowSelectable = (
  row: Row,
  rowIndex: number,
  manager: ContextInterface,
  selection = manager.selection,
) => {
  if (!selection?.isRowSelectable) return true
  return selection.isRowSelectable(row, rowIndex, manager)
}

export const getSelectableRows = (
  rows: Row[],
  manager: ContextInterface,
  selection = manager.selection,
) => {
  return rows.filter((row, index) => isRowSelectable(row, index, manager, selection))
}

export const sanitizeCheckeds = (
  checkeds: Row[],
  rows: Row[],
  manager: ContextInterface,
  selection: SelectionInterface | undefined = manager.selection,
) => {
  const selectableRows = getSelectableRows(rows, manager, selection)
  const selectableEncoded = selectableRows.map((row) => JSON.stringify(row))

  return checkeds.filter((checked) =>
    selectableEncoded.includes(JSON.stringify(checked)),
  )
}

const parseComparable = (value: unknown, type?: ColumnInterface['type']) => {
  if (value === null || value === undefined) return null

  if (type === 'date') {
    const parsed = new Date(String(value)).getTime()
    return Number.isNaN(parsed) ? null : parsed
  }

  if (type === 'numeric') {
    const parsed = Number(value)
    return Number.isNaN(parsed) ? null : parsed
  }

  if (typeof value === 'number' || typeof value === 'bigint') return Number(value)
  if (typeof value === 'boolean') return value ? 1 : 0

  return String(value).toLowerCase()
}

export const sortRows = (
  rows: Row[],
  sort: SortState | null,
  columns: ColumnInterface[],
) => {
  if (!sort) return rows

  const column = columns.find((col) => (col.sortKey || col.key) === sort.sort)
  if (!column) return rows

  const key = column.sortKey || column.key
  const direction = sort.direction === 'ASC' ? 1 : -1

  return [...rows].sort((left, right) => {
    const leftValue = parseComparable(left?.[key], column.type)
    const rightValue = parseComparable(right?.[key], column.type)

    if (leftValue === rightValue) return 0
    if (leftValue === null) return 1
    if (rightValue === null) return -1

    if (leftValue > rightValue) return direction
    if (leftValue < rightValue) return -direction
    return 0
  })
}

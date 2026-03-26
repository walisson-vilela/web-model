import styled, { css } from 'styled-components'

import type { VerticalAligns } from '../interfaces'

interface TableCellProps {
  $verticalalignment?: VerticalAligns
  $pointer?: true
  $textAlign?: 'center' | 'left' | 'right'
  $width?: number
}

const getFlex = (width?: number) => {
  const w = Math.max(1, Math.min(16, width || 1))
  return `${w} ${w} 0`
}

const getJustify = (align?: TableCellProps['$textAlign']) => {
  if (align === 'center') return 'center'
  if (align === 'right') return 'flex-end'
  return 'flex-start'
}

export const TableCell = styled.td<TableCellProps>`
  display: flex;
  align-items: ${({ $verticalalignment: verticalalignment }) =>
    verticalalignment || 'center'};
  justify-content: ${({ $textAlign: textAlign }) => getJustify(textAlign)};
  position: relative;

  padding: 0 12px;
  min-height: 45px;
  font-size: 14px;
  line-height: 17px;
  color: #263046;
  min-width: 0;

  flex: ${({ $width: width }) => getFlex(width)};

  ${({ $pointer: pointer }) =>
    pointer &&
    css`
      cursor: pointer;
    `}
`

export const CheckCell = styled(TableCell)`
  flex: 0 0 42px;
  justify-content: center;
  padding: 0;
`

export const TableButtonCell = styled(TableCell)`
  flex: 0 0 42px;
  padding: 0;
  justify-content: center;
`

export const DropdownContainer = styled.div`
  position: relative;
  width: 22px;
`

interface TableRowProps {
  $stripped?: boolean
}

export const TableRow = styled.tr<TableRowProps>`
  border-top: 1px solid #e2e2e3;
  display: flex;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;

  ${({ $stripped: stripped }) => {
    if (!stripped) return

    return css`
      &&:nth-child(even) {
        background-color: #fafafb;
      }
    `
  }}

  td {
    border: 0;
  }
`

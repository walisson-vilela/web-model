import { useContext } from 'react'

import Input from '../../../../Input'
import EllipsisContainer from '../../EllipsisContainer'
import Sort from '../Sort'
import ManagerContext from '../context'
import { getSelectableRows } from '../functions'
import type { ColumnInterface } from '../interfaces'

import * as S from './styled'

/**
 * Componente responsável pelo cabeçalho da tabela
 *
 * @param props
 * @constructor
 */
export const TableHeader = () => {
  const context = useContext(ManagerContext)
  const { columns, checkeds, rows, getItemMenu, list, borderless } = context
  const selectableRows = checkeds ? getSelectableRows(rows, context) : []

  const getContent = (col: ColumnInterface) => {
    const fieldKey = col.sortKey || col.key

    if (!fieldKey) {
      return <EllipsisContainer>{col.content}</EllipsisContainer>
    }

    return <Sort fieldKey={fieldKey}>{col.content}</Sort>
  }

  const bgcolor = list ? '#FFF' : undefined

  return (
    <thead>
      <S.TableRow $bgcolor={bgcolor}>
        {checkeds && (
          <S.CheckHeaderCell $bgcolor={bgcolor} $borderless={borderless}>
            {(() => {
              if (checkeds.hideCheckAll || selectableRows.length === 0) {
                return <div style={{ width: 17, height: 17 }} />
              }

              const selectedCount = checkeds.checkeds.filter((checked) =>
                selectableRows.some(
                  (row) => JSON.stringify(row) === JSON.stringify(checked),
                ),
              ).length

              return (
                <Input
                  type='checkbox'
                  onChange={(e) => {
                    checkeds.setCheckeds(e.target.checked ? selectableRows : [])
                  }}
                  checked={
                    selectedCount === selectableRows.length && selectableRows.length > 0
                  }
                />
              )
            })()}
          </S.CheckHeaderCell>
        )}

        {columns.map((col, index) => {
          return (
            <S.TableHeaderCell
              key={index}
              $textAlign={col.textAlign}
              $width={col.width}
              $bgcolor={bgcolor}
              $borderless={borderless}
            >
              {getContent(col)}
            </S.TableHeaderCell>
          )
        })}

        {getItemMenu && (
          <S.MenuHeaderCell $bgcolor={bgcolor} $borderless={borderless} />
        )}
      </S.TableRow>
    </thead>
  )
}

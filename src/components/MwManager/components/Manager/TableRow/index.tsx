import React, { useContext } from 'react'

import Input from '../../../../Input'
import { isObject } from '../../../functions'
import Dropdown from '../../Dropdown'
import EllipsisContainer from '../../EllipsisContainer'
import ManagerContext from '../context'
import type { Row } from '../interfaces'

import * as S from './styled'

export interface TableRowProps {
  /** conteudo da linha */
  row: Row
  index: number
}

export const TableRow = (props: TableRowProps) => {
  const { row, index: i } = { ...props }

  const context = useContext(ManagerContext)
  const {
    columns,
    checkeds,
    getItemMenu,
    loading,
    centerCoodinates,
    itemMenuVerticalAlign,
    getRowDisabled,
    list,
    onClickColumn,
  } = {
    ...context,
  }

  const [stripped] = list ? [undefined] : [true]

  const cols = [...[...columns].slice(0, 1)].map((v) => ({ ...v }))

  columns.slice(1).forEach((col) => {
    if (
      !isObject(row[col.key]) ||
      !('merged' in row[col.key]) ||
      !row[col.key].merged
    ) {
      cols.push({ ...col })
    } else {
      const w = cols[cols.length - 1].width

      if (w !== undefined && col.width !== undefined) {
        const s = w + col.width
        cols[cols.length - 1].width = s as (typeof cols)[number]['width']
      }
    }
  })

  const disabled = getRowDisabled(row)

  return (
    <S.TableRow $stripped={stripped}>
      {checkeds && (
        <S.CheckCell $verticalalignment={checkeds.verticalAlign}>
          <Input
            type={checkeds.asRadio ? 'radio' : 'checkbox'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              checkeds.setCheckeds((prev) => {
                const newState = prev.filter(
                  (e) => JSON.stringify(e) !== JSON.stringify(row),
                )
                return event.target.checked ? [...newState, row] : newState
              })
            }}
            checked={checkeds.checkeds
              .map((e) => JSON.stringify(e))
              .includes(JSON.stringify(row))}
          />
        </S.CheckCell>
      )}

      {cols.map((col, j) => {
        const content = row[col.key] || row[col.key] === 0 ? row[col.key] : '-'

        return (
          <S.TableCell
            key={j}
            $textAlign={col.textAlign}
            $width={col.width}
            $verticalalignment={col.verticalAlign}
            {...(onClickColumn && !disabled
              ? {
                  onClick: (e: React.MouseEvent<HTMLTableCellElement>) =>
                    onClickColumn([row, i], [col, j], e),
                  $pointer: true,
                }
              : {})}
          >
            {col.ellipsis !== false ? (
              <EllipsisContainer>{content}</EllipsisContainer>
            ) : (
              content
            )}
          </S.TableCell>
        )
      })}

      {(() => {
        if (!getItemMenu) return

        const items = getItemMenu(row)

        return (
          <S.TableButtonCell $verticalalignment={itemMenuVerticalAlign}>
            <S.DropdownContainer>
              {(() => {
                const dropdownProps = {
                  loading: loading,
                  axis: 'y' as const,
                  centerCoodinates: centerCoodinates || { y: 85 },
                }

                if (Array.isArray(items)) {
                  return (
                    <Dropdown
                      {...dropdownProps}
                      items={items}
                      notAbsolute
                      occult={items.length === 0}
                    />
                  )
                }

                return (
                  <Dropdown
                    {...dropdownProps}
                    items={[]}
                    notAbsolute
                    disabled={
                      items === false
                        ? true
                        : {
                            position: 'left center',
                            inverted: true,
                            content: items,
                          }
                    }
                  />
                )
              })()}
            </S.DropdownContainer>
          </S.TableButtonCell>
        )
      })()}
    </S.TableRow>
  )
}

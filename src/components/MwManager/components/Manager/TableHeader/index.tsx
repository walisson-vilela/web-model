import { useContext } from 'react'

import Input from '../../../../Input'
import EllipsisContainer from '../../EllipsisContainer'
import Sort from '../Sort'
import ManagerContext from '../context'
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

  const getContent = (col: ColumnInterface) => {
    if (!col.sortKey) {
      return <EllipsisContainer>{col.content}</EllipsisContainer>
    }
    return <Sort fieldKey={col.sortKey}>{col.content}</Sort>
  }

  const bgcolor = list ? '#FFF' : undefined

  return (
    <thead>
      <S.TableRow $bgcolor={bgcolor}>
        {checkeds && (
          <S.CheckHeaderCell $bgcolor={bgcolor} $borderless={borderless}>
            {(() => {
              if (checkeds.hideCheckAll) {
                return <div style={{ width: 17, height: 17 }} />
              }

              return (
                <Input
                  type='checkbox'
                  onChange={(e) => {
                    checkeds.setCheckeds(e.target.checked ? rows : [])
                  }}
                  checked={
                    checkeds.checkeds.length === rows.length && rows.length > 0
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

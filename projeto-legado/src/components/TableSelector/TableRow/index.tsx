import React, { useContext } from 'react'

import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Checkbox, Radio } from 'semantic-ui-react'

import { booleanOrDefault } from '../../../utils/Formatters'
import TableSelectorContext from '../context'
import { Row } from '../interfaces'
import * as MainStyles from '../styled'

import * as S from './styled'

interface TableRowProps {
  /** conteudo da linha */
  row: Row
}

const TableRow = (props: TableRowProps) => {
  const { row } = { ...props }

  const { selected, setSelected } = useContext(TableSelectorContext)

  return (
    <MainStyles.TableRow>
      {Array.isArray(selected) ? (
        <S.CheckboxCell>
          <Checkbox
            onChange={(_event: any, data: any) => {
              setSelected((prev: any[]) => {
                const newState = prev.filter(
                  (e: any) => JSON.stringify(e) !== JSON.stringify(row.data),
                )
                return data.checked ? [...newState, row.data] : newState
              })
            }}
            checked={selected
              .map((e) => JSON.stringify(e))
              .includes(JSON.stringify(row.data))}
            disabled={booleanOrDefault(row.data.disabled, false)}
          />
        </S.CheckboxCell>
      ) : (
        <S.RadioCell>
          <Radio
            onChange={(_event: any, data: any) => {
              setSelected(data.checked ? row.data : null)
            }}
            checked={JSON.stringify(selected) === JSON.stringify(row.data)}
            disabled={booleanOrDefault(row.data.disabled, false)}
          />
        </S.RadioCell>
      )}

      <S.TableCell width={16}>
        <EllipsisContainer>
          {row.content || row.content === 0 ? row.content : '-'}
        </EllipsisContainer>
      </S.TableCell>
    </MainStyles.TableRow>
  )
}

export default TableRow

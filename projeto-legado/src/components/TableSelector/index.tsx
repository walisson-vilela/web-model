import React, { useEffect, useRef } from 'react'

import {
  booleanOrDefault,
  notEmptyStringOrDefault,
} from '../../utils/Formatters'

import { TableBody } from './TableBody'
import Toolbar from './Toolbar'
import TableSelectorContext from './context'
import { TableSelectorProps } from './interfaces'
import * as S from './styled'

const getTbody = (element: any): any => {
  // getting table element
  const table = element.getElementsByTagName('table')[0]
  // getting tbody element
  return table.tBodies[0]
}

const TableSelector = (props: TableSelectorProps) => {
  const { selected, setSelected, rows, setSearch, filters } = {
    ...props,
  }

  const loading = booleanOrDefault(props.loading, false)

  const emptyMessage = notEmptyStringOrDefault(
    props.emptyMessage,
    'Nenhum resultado encontrado',
  )

  const pagination = props.pagination || {
    page: 1,
    setPage: () => {},
    lastPage: true,
  }

  const ref = useRef(null)

  useEffect(() => {
    // if page is reseted to 1
    if (pagination.page === 1 && ref && ref.current) {
      // getting tbody element
      const tbody = getTbody(ref.current)
      // scrolling tbody to top
      tbody.scrollTop = 0
    }
  }, [pagination.page])

  // sempre que os itens exibidos forem alterados, o(s) item(ns) selecionado(s) que nao estao sendo exibidos devem ser removidos
  useEffect(() => {
    const encoded = rows.map((row) => JSON.stringify(row.data))

    if (Array.isArray(selected)) {
      setSelected((prev) =>
        prev.filter((item) => encoded.includes(JSON.stringify(item))),
      )
    } else if (
      selected !== null &&
      !encoded.includes(JSON.stringify(selected))
    ) {
      setSelected(null)
    }
  }, [rows])

  const paginator = () => {
    if (pagination.lastPage) return
    pagination.setPage((prev: number) => prev + 1)
  }

  return (
    <S.Container ref={ref}>
      <TableSelectorContext.Provider
        value={{
          selected,
          setSelected,
          rows,
          setSearch: (newState) => {
            setSearch(newState)
            pagination.setPage(1)
          },
          loading,
          paginator,
          emptyMessage,
          filters,
        }}
      >
        <Toolbar />
        <S.OptionsTable>
          <TableBody />
        </S.OptionsTable>
      </TableSelectorContext.Provider>
    </S.Container>
  )
}

export default TableSelector

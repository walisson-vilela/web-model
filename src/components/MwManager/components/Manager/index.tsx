import { useEffect, useRef } from 'react'

import type { SortState } from './Sort/interfaces'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader/'
import ManagerContext from './context'
import type { ManagerProps } from './interfaces'
import * as S from './styled'

const defaultMessages = {
  empty: 'Nenhum resultado encontrado',
  emptyWithFilters: 'Nenhum resultado encontrado para a busca realizada',
}

const Manager = (props: ManagerProps) => {
  const {
    columns,
    rows,
    hasFilters,
    loading,
    page,
    resetKey,
    checkeds,
    getItemMenu,
    itemMenuVerticalAlign,
    centerCoodinates,
    getRowDisabled,
    headerless,
    keepCheckeds,
    list,
    borderless,
    onClickColumn,
  } = {
    ...props,
  }

  const { sort, setSort } = props.sort
    ? props.sort
    : {
        sort: null,
        setSort: () => {},
      }

  const setPage = props.setPage || (() => {})

  const paginator = props.paginator || (() => {})

  const messages = { ...defaultMessages, ...(props.messages || {}) }

  const ref = useRef<HTMLDivElement | null>(null)
  const lastResetKeyRef = useRef<typeof resetKey>(resetKey)

  const getTbody = (element: HTMLDivElement): HTMLElement => {
    // getting table element
    const table = element.getElementsByTagName('table')[0]
    // getting tbody element
    return table.tBodies[0]
  }

  // quando aplica filtros/reset, deve ser mantido selecionado somente os elementos que estão na tela
  useEffect(() => {
    if (!checkeds || keepCheckeds) return

    const resetKeyChanged = lastResetKeyRef.current !== resetKey
    const shouldClear = resetKeyChanged || page === 1

    if (shouldClear) {
      checkeds.setCheckeds([])
    } else {
      const encoded = rows.map((row) => JSON.stringify(row))

      checkeds.setCheckeds((prev) =>
        prev.filter((checked) => encoded.includes(JSON.stringify(checked))),
      )
    }

    lastResetKeyRef.current = resetKey
  }, [rows, resetKey, page])

  useEffect(() => {
    // if page is reseted to 1
    if (page === 1) {
      if (ref && ref.current) {
        // getting tbody element
        const tbody = getTbody(ref.current)
        // scrolling tbody to top
        tbody.scrollTop = 0
      }
    }
  }, [page])

  useEffect(() => {
    if (resetKey === undefined) return

    if (ref && ref.current) {
      const tbody = getTbody(ref.current)
      tbody.scrollTop = 0
    }
  }, [resetKey])

  const _setSort = (newState: SortState | null) => {
    setSort(newState)
    setPage(1)
  }

  return (
    <S.Container ref={ref} $borderless={borderless}>
      <ManagerContext.Provider
        value={{
          columns,
          rows,
          hasFilters,
          messages,
          sort: {
            sort: sort,
            setSort: _setSort,
          },
          loading,
          paginator,
          checkeds,
          getItemMenu,
          itemMenuVerticalAlign,
          centerCoodinates,
          getRowDisabled: getRowDisabled || (() => false),
          headerless,
          list,
          borderless,
          onClickColumn,
        }}
      >
        <S.Table>
          {!headerless && <TableHeader />}
          <TableBody />
        </S.Table>
      </ManagerContext.Provider>
    </S.Container>
  )
}

export default Manager

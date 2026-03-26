import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import type { SortState } from './Sort/interfaces'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader/'
import ManagerContext from './context'
import { sortRows } from './functions'
import type { MwManagerProps } from './interfaces'
import * as S from './styled'

const defaultMessages = {
  empty: 'Nenhum resultado encontrado',
  emptyWithFilters: 'Nenhum resultado encontrado para a busca realizada',
}

const MwManager = (props: MwManagerProps) => {
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

  const setPage = props.setPage || (() => {})

  const paginator = props.paginator || (() => {})

  const messages = { ...defaultMessages, ...(props.messages || {}) }
  const [internalSort, setInternalSort] = useState<SortState | null>(null)
  const currentSort = props.sort?.sort ?? internalSort
  const setCurrentSort = props.sort?.setSort ?? setInternalSort
  const sortedRows = sortRows(rows, currentSort, columns)

  const ref = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLTableSectionElement | null>(null)
  const lastResetKeyRef = useRef<typeof resetKey>(resetKey)
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)

  const updateMaxHeight = () => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const available = Math.floor(window.innerHeight - rect.top - 10)
    setMaxHeight(available > 0 ? available : 0)
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

  useLayoutEffect(() => {
    updateMaxHeight()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateMaxHeight)
    return () => window.removeEventListener('resize', updateMaxHeight)
  }, [])

  useEffect(() => {
    if (page === 1 && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [page])

  useEffect(() => {
    if (resetKey === undefined) return

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [resetKey])

  const _setSort = (newState: SortState | null) => {
    setCurrentSort(newState)
    setPage(1)
  }

  return (
    <S.Container ref={ref} $borderless={borderless}>
      <ManagerContext.Provider
        value={{
          columns,
          rows: sortedRows,
          hasFilters,
          messages,
          sort: {
            sort: currentSort,
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
        <S.ScrollArea $maxHeight={maxHeight}>
          <S.Table>
            {!headerless && <TableHeader />}
            <TableBody ref={scrollRef} />
          </S.Table>
        </S.ScrollArea>
      </ManagerContext.Provider>
    </S.Container>
  )
}

export default MwManager

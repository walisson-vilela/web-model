import React, {
  forwardRef,
  useImperativeHandle,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

import { TableRow } from '../TableRow'
import ManagerContext from '../context'

import * as S from './styled'

interface FullContainerProps {
  /** conteudo html ou string do container */
  children?: JSX.Element | string
}

const FullContainer = (props: FullContainerProps) => (
  <S.MessageRow>
    <S.MessageCell>{props.children}</S.MessageCell>
  </S.MessageRow>
)

const Loading = () => {
  const [height, setHeight] = useState<number | null>(null)
  const ref = useRef<HTMLTableRowElement | null>(null)

  useEffect(() => {
    let height = null

    if (ref && ref.current) {
      const tr = ref.current
      const tbody = tr.parentElement as HTMLElement
      if (tbody.offsetHeight > 0) height = tbody.offsetHeight
    }

    setHeight(height)
  }, [ref])

  return (
    <S.LoaderRow ref={ref}>
      <S.LoaderCell>
        <S.LoaderContainer $height={height}>
          <S.Spinner aria-label='Carregando' />
        </S.LoaderContainer>
      </S.LoaderCell>
    </S.LoaderRow>
  )
}

export const TableBody = forwardRef<HTMLTableSectionElement, Record<string, never>>(
  function TableBody(_props, ref) {
    const context = useContext(ManagerContext)
    const { rows, hasFilters, messages, loading, paginator } = {
      ...context,
    }
    const tbodyRef = useRef<HTMLTableSectionElement | null>(null)
    const lastPaginatorLengthRef = useRef<number | null>(null)

    useImperativeHandle(ref, () => tbodyRef.current as HTMLTableSectionElement)

    const virtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => tbodyRef.current,
      estimateSize: () => 45,
      overscan: 5,
    })

    const virtualItems = virtualizer.getVirtualItems()
    const totalSize = virtualizer.getTotalSize()

    const getContent = () => {
      // se tem dados mostra os dados
      if (rows.length > 0) {
        return (
          <>
            <S.SpacerRow aria-hidden='true'>
              <S.SpacerCell style={{ height: `${totalSize}px` }} />
            </S.SpacerRow>

            {virtualItems.map((virtualRow) => {
              const row = rows[virtualRow.index]
              if (!row) return null

              return (
                <TableRow
                  key={virtualRow.key}
                  row={row}
                  index={virtualRow.index}
                  last={virtualRow.index === rows.length - 1}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                />
              )
            })}
          </>
        )
      }

      // definindo a mensagem que deve ser mostrada
      const message = messages[hasFilters ? 'emptyWithFilters' : 'empty']

      // retornando o html da mensagem
      return <FullContainer>{message}</FullContainer>
    }

    useEffect(() => {
      if (!paginator || rows.length === 0) return
      if (virtualItems.length === 0) return

      const lastVisibleIndex = virtualItems[virtualItems.length - 1].index
      const shouldLoadMore = lastVisibleIndex >= rows.length - 5
      const hasAlreadyRequestedThisLength =
        lastPaginatorLengthRef.current === rows.length

      if (shouldLoadMore && !hasAlreadyRequestedThisLength) {
        lastPaginatorLengthRef.current = rows.length
        paginator()
      }
    }, [paginator, rows.length, virtualItems])

    return (
      <S.TableBody ref={tbodyRef}>
        {getContent()}
        {loading && <Loading />}
      </S.TableBody>
    )
  },
)

import React, { useContext, useEffect, useRef, useState } from 'react'

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

export const TableBody = () => {
  const [lastPagination, setLastPagination] = useState<Date>(new Date())

  const context = useContext(ManagerContext)
  const { rows, hasFilters, messages, loading, paginator } = {
    ...context,
  }

  const getContent = () => {
    // se tem dados mostra os dados
    if (rows.length > 0) {
      return rows.map((row, index: number) => (
        <TableRow key={index} row={row} index={index} />
      ))
    }

    // definindo a mensagem que deve ser mostrada
    const message = messages[hasFilters ? 'emptyWithFilters' : 'empty']

    // retornando o html da mensagem
    return <FullContainer>{message}</FullContainer>
  }

  const onScroll: React.UIEventHandler<HTMLTableSectionElement> = (event) => {
    // preventing event bubbling, can be removed if react is grather than 17
    if (event.target !== event.currentTarget) return

    const target = event.nativeEvent.target as HTMLElement
    const scrollTopMax =
      target.scrollHeight - target.getBoundingClientRect().height - 10 // -10 is a workaround to work with Chrome zoom
    const scrollTop = target.scrollTop

    if (scrollTopMax > 0 && scrollTop >= scrollTopMax) {
      const now = new Date()

      const diff = Math.abs((now.getTime() - lastPagination.getTime()) / 1000)

      if (diff < 0.5) return

      setLastPagination(new Date())
      paginator()
    }
  }

  return (
    <S.TableBody onScroll={onScroll}>
      {getContent()}
      {loading && <Loading />}
    </S.TableBody>
  )
}

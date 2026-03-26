import React, { useContext } from 'react'

import TableRow from '../TableRow'
import TableSelectorContext from '../context'

import FullContainer from './FullContainer'
import Loading from './Loading'
import * as S from './styled'

export const TableBody = () => {
  const context = useContext(TableSelectorContext)
  const { rows, emptyMessage, loading, paginator } = {
    ...context,
  }

  const getContent = () => {
    // se tem dados mostra os dados
    if (rows.length > 0) {
      return rows.map((row, index: number) => (
        <TableRow key={index} row={row} />
      ))
    }

    // retornando o html da mensagem
    return <FullContainer>{emptyMessage}</FullContainer>
  }

  const onScroll = (event: any) => {
    const scrollTopMax = event.nativeEvent.target.scrollTopMax
    const scrollTop = event.nativeEvent.target.scrollTop

    if (scrollTopMax !== 0 && scrollTopMax === scrollTop) paginator()
  }

  return (
    <S.TableBody onScroll={onScroll}>
      {getContent()}
      {loading && <Loading />}
    </S.TableBody>
  )
}

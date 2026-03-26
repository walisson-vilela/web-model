import { useContext } from 'react'

import EllipsisContainer from '../../EllipsisContainer'
import ManagerContext from '../context'

import type * as I from './interfaces'
import * as S from './styled'

interface SortProps {
  /** chave da ordenacao */
  fieldKey: string
  /** conteudo html ou string da coluna */
  children: JSX.Element | string
}

interface SequenceInterface {
  ASC: 'ASC' | 'DESC'
  null: 'ASC' | 'DESC'
  DESC: null
}

const sequence: SequenceInterface = {
  ASC: 'DESC',
  DESC: null,
  null: 'ASC',
}

type SortDirection = 'ASC' | 'DESC' | null

const SortIcon = (props: { direction: SortDirection }) => {
  const { direction } = props

  const active = '#3455AB'
  const inactive = '#b2b2b2'

  const upColor = direction === 'ASC' ? active : inactive
  const downColor = direction === 'DESC' ? active : inactive

  return (
    <S.Icon aria-hidden='true' viewBox='0 0 12 12'>
      <path d='M6 2l3 3H3l3-3z' fill={upColor} />
      <path d='M6 10l-3-3h6l-3 3z' fill={downColor} />
    </S.Icon>
  )
}

const Sort = (props: SortProps) => {
  const { fieldKey, children } = { ...props }

  const {
    sort: { sort, setSort },
    loading,
  } = useContext(ManagerContext)

  const alternate = () => {
    let newSort: I.SortState | null = {
      sort: fieldKey,
      direction: 'ASC',
    }

    if (sort && sort.sort === fieldKey) {
      const direction = sequence[sort.direction]

      if (direction === null) newSort = null
      else newSort.direction = direction
    }

    setSort(newSort)
  }

  const direction: SortDirection =
    sort && sort.sort === fieldKey ? sort.direction : null

  return (
    <S.Container onClick={alternate} disabled={loading}>
      <EllipsisContainer>{children}</EllipsisContainer>
      <SortIcon direction={direction} />
    </S.Container>
  )
}

export default Sort

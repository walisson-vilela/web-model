import React from 'react'

import { ChipProps } from './interfaces'
import * as S from './styles'

const CustomChip = ({ haveError, close, value }: ChipProps) => {
  const searchRemove = (prev: string[]): string[] => {
    let aux: string[] = [...prev]

    const index = aux.indexOf(value)

    if (index >= 0) aux.splice(index, 1)

    return aux
  }

  return (
    <S.Chip haveError={haveError}>
      <S.Content>{value}</S.Content>

      <S.Button onClick={() => close((prev) => searchRemove(prev))}>
        {' '}
        x{' '}
      </S.Button>
    </S.Chip>
  )
}

export default CustomChip

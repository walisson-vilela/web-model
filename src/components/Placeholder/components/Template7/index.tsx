import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template7 = (props: PlaceholderProps) => {
  if (!props.loading) return <React.Fragment />
  return (
    <S.Container>
      <S.Header>
        <S.CustomLine
          $width='89px'
          $height='10px'
          $color='#EBEBEB'
          $size='large'
        />
      </S.Header>
      <S.Main>
        <S.Circle />
        <S.Circle />
        <S.Circle />
        <S.Circle />
        <S.Circle />
      </S.Main>
    </S.Container>
  )
}

export default Template7

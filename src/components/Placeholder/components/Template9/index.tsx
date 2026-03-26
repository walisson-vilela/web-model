import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template8 = (props: PlaceholderProps) => {
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
        <S.CustomLine
          $width='50px'
          $height='10px'
          $color='#EBEBEB'
          $size='large'
        />
      </S.Header>
      <S.Main>
        <S.Circle />
      </S.Main>
    </S.Container>
  )
}

export default Template8

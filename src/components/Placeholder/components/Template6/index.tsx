import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template6 = (props: PlaceholderProps) => {
  if (!props.loading) return <React.Fragment />
  return (
    <S.Container>
      <S.Header>
        <S.CustomLine
          $width='274px'
          $height='10px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.CustomLine
          $width='274px'
          $height='10px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.CustomLine
          $width='274px'
          $height='10px'
          $color='#EBEBEB'
          $size='large'
        />
      </S.Header>
    </S.Container>
  )
}

export default Template6

import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template5 = (props: PlaceholderProps) => {
  if (!props.loading) return <React.Fragment />
  return (
    <S.Container>
      <S.Circle />
      <S.MainContent>
        <S.CustomLine
          $width='406px'
          $height='16px'
          $color='#DDDEDF'
          $size='large'
        />
        <S.CustomLine
          $width='387px'
          $height='16px'
          $color='#DDDEDF'
          $size='large'
        />
        <S.CustomLine
          $width='426px'
          $height='16px'
          $color='#DDDEDF'
          $size='large'
        />
        <S.CustomLine
          $width='189px'
          $height='16px'
          $color='#DDDEDF'
          $size='large'
        />
      </S.MainContent>
    </S.Container>
  )
}

export default Template5

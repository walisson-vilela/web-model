import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template10 = (props: PlaceholderProps) => {
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
        <S.GraphLine
          $width='27px'
          $height='56px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='73px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='61px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='56px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='73px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='61px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='27px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='90px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='56px'
          $color='#EBEBEB'
          $size='large'
        />
        <S.GraphLine
          $width='27px'
          $height='56px'
          $color='#EBEBEB'
          $size='large'
        />
      </S.Main>
    </S.Container>
  )
}

export default Template10

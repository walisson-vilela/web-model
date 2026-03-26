import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template1 = (props: PlaceholderProps) => {
  if (!props.loading) return <React.Fragment />
  return (
    <S.Container>
      <S.Header>
        <S.HeaderImage />
        <S.HeaderContent>
          <S.HeaderLine $size='medium' $height='9px' $color='#E6E6E6' />
          <S.HeaderLine $size='small' $height='9px' $color='#E6E6E6' />
        </S.HeaderContent>
      </S.Header>
      <S.MainContent>
        <S.MainLine $size='medium' $height='9px' $color='#E6E6E6' />
        <S.MainLine $size='small' $height='9px' $color='#E6E6E6' />
        <S.MainLine $size='mini' $height='9px' $color='#E6E6E6' />
        <S.MainLine $size='medium' $height='9px' $color='#E6E6E6' />
        <S.MainLine $size='small' $height='9px' $color='#E6E6E6' />
      </S.MainContent>
    </S.Container>
  )
}

export default Template1

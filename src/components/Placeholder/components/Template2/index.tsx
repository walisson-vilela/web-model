import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template2 = (props: PlaceholderProps) => {
  if (!props.loading) return <React.Fragment />
  return (
    <S.Template2Container>
      <S.Header>
        <S.HeaderImage />
        <S.HeaderContent>
          <S.HeaderLine $size='mini' $height='9px' $color='#E6E6E6' />
          <S.HeaderLine $size='mini' $height='9px' $color='#E6E6E6' />
        </S.HeaderContent>
      </S.Header>
      <S.MainContent>
        <S.MainLine $size='mini' $height='9px' $color='#E6E6E6' />
        <S.MainLine $size='mini' $height='9px' $color='#E6E6E6' />
      </S.MainContent>
    </S.Template2Container>
  )
}

export default Template2

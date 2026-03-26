import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template3 = (props: PlaceholderProps) => {
  if (!props.loading) return <React.Fragment />
  return (
    <S.Template3Container>
      <S.Template3Line $size='large' $height='7px' $color='#DADADA' />
      <S.Template3Line $size='small' $height='7px' $color='#DADADA' />
      <S.Template3Line $size='medium' $height='7px' $color='#DADADA' />
      <S.Template3Line $size='small' $height='7px' $color='#DADADA' />
      <S.Template3Line $size='mini' $height='7px' $color='#DADADA' />
    </S.Template3Container>
  )
}

export default Template3

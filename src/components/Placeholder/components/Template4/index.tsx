import React from 'react'

import type { PlaceholderProps } from '../../interfaces'

import * as S from './styles'

const Template4 = (props: PlaceholderProps) => {
  if (!props.loading) return <React.Fragment />
  return (
    <S.Template4Container>
      <S.CustomLine
        $size='large'
        $height='12px'
        $color='#DDDEDF'
        $width='594px'
      />
      <S.CustomLine
        $size='large'
        $height='12px'
        $color='#DDDEDF'
        $width='572px'
      />
      <S.CustomLine
        $size='large'
        $height='12px'
        $color='#DDDEDF'
        $width='624px'
      />
      <S.CustomLine
        $size='large'
        $height='12px'
        $color='#DDDEDF'
        $width='544px'
      />
      <S.CustomLine
        $size='large'
        $height='12px'
        $color='#DDDEDF'
        $width=' 607px'
      />
      <S.CustomLine
        $size='large'
        $height='12px'
        $color='#DDDEDF'
        $width='581px'
      />
      <S.CustomLine
        $size='large'
        $height='12px'
        $color='#DDDEDF'
        $width='601px'
      />
      <S.CustomLine
        $size='large'
        $height='12px'
        $color='#DDDEDF'
        $width='251px'
      />
    </S.Template4Container>
  )
}

export default Template4

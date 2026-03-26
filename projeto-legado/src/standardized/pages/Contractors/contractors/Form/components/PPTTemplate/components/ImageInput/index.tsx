import React from 'react'

import { MwIcon } from '@mw-kit/mw-ui'

import * as S from './styles'

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'children'
>

const ImageInput = (props: Props) => {
  return (
    <S.Label>
      <MwIcon
        type='semantic'
        icon='upload'
        width='14px'
        height='14px'
        color='darkBlue'
      />
      Upload Template
      <input {...props} type='file' accept='image/*' />
    </S.Label>
  )
}

export default ImageInput

import React from 'react'

import COLORS from '../../../../../../../../../../../components/GoogleMap/Marker/colors'

import * as S from './styled'

interface ICircle {
  type: 'Cadastro' | 'Receita Federal'
  children: React.ReactNode
}

const Circle = (props: ICircle) => {
  const { type, children } = props
  return (
    <S.Container>
      <div>{children}</div>
      <S.CircleIcon
        $type={type}
        height={12}
        width={12}
        icon='circle'
        type='feather'
        color={type === 'Receita Federal' ? COLORS.YELLOW : COLORS.BLUE}
      />
    </S.Container>
  )
}

export default Circle

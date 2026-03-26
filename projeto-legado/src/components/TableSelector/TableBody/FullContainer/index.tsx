import React from 'react'

import * as S from './styled'

interface FullContainerProps {
  /** conteudo html ou string do container */
  children?: JSX.Element | string
}

const FullContainer = (props: FullContainerProps) => (
  <S.MessageRow>
    <S.MessageCell textAlign='center'>{props.children}</S.MessageCell>
  </S.MessageRow>
)

export default FullContainer

import React from 'react'

import * as GlobalStyles from '../../styled'

import * as S from './styled'

interface BlankToolbarProps {
  /** conteudo diverso que sera exibido na parte direita da barra de ferramentas */
  left?: React.ReactElement | React.ReactElement[]
  /** conteudo diverso que sera exibido na parte esquerda da barra de ferramentas */
  right?: React.ReactElement | React.ReactElement[]
  /** remove as bordas externas do toolbar */
  borderless?: boolean
}

const BlankToolbar = (props: BlankToolbarProps) => {
  const { left, right, borderless } = props

  const getContent = (
    elements: React.ReactElement | React.ReactElement[],
  ): React.ReactElement | React.ReactElement[] => {
    if (!elements) return <React.Fragment />

    if (Array.isArray(elements)) {
      return elements.map((children, index) => (
        <S.Cell key={index}>{children}</S.Cell>
      ))
    }

    return <S.Cell>{elements}</S.Cell>
  }

  return (
    <GlobalStyles.ThemeContainer>
      <S.Container $borderless={borderless}>
        <S.FirstContainer>{left && getContent(left)}</S.FirstContainer>
        <S.SecondContainer>{right && getContent(right)}</S.SecondContainer>
      </S.Container>
    </GlobalStyles.ThemeContainer>
  )
}

export default BlankToolbar

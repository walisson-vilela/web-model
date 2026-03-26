import React from 'react'

import * as S from './styles'

interface HeaderProps {
  title: string
  description: string
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <S.HeaderContainer>
      <h2>{title}</h2>
      <h3>{description}</h3>
    </S.HeaderContainer>
  )
}

export default Header

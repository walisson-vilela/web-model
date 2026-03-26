import React from 'react'

import Input from '../../../../../Input'
import { useContext } from '../../context'

import * as S from './styles'

const Header = () => {
  const context = useContext()

  if (!context.props.search) {
    return <React.Fragment />
  }

  const {
    searchInput: [searchInput, setSearchInput],
  } = context

  return (
    <S.HeaderContainer>
      <Input
        type='search'
        placeholder='Pesquisa'
        setValue={setSearchInput}
        value={searchInput}
        icon={{
          icon: {
            type: 'feather',
            icon: 'search',
          },
        }}
      />
    </S.HeaderContainer>
  )
}

export default Header

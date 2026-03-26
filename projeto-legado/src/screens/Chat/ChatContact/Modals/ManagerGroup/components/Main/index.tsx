import React, { useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'

import Participant from './components/Participant'
import * as S from './styles'

const Main = () => {
  const [search, setSearch] = useState('')
  return (
    <S.Container>
      <S.Header>
        <SearchFilter setSearch={setSearch} />
      </S.Header>
      <S.Content>
        <Participant />
      </S.Content>
    </S.Container>
  )
}

export default Main

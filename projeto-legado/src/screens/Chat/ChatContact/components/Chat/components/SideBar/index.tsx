import React, { useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { FiArrowLeft, FiX } from 'react-icons/fi'

import { useChat } from '../../context'
import * as S from '../../styles'

const SideBar = () => {
  const [search, setSearch] = useState('')
  const { openSideBar, handleSideBar } = useChat()

  if (!openSideBar) return <></>
  return (
    <S.SideBar>
      <header>
        <FiX size={20} color='#B8B9BB' onClick={handleSideBar} />
        <strong> Pesquisar Mensagens </strong>
      </header>

      <main>
        <S.CustomSearch>
          <FiArrowLeft size={20} color='#b8b9bb' />
          <SearchFilter setSearch={setSearch} />
        </S.CustomSearch>
      </main>
    </S.SideBar>
  )
}

export default SideBar

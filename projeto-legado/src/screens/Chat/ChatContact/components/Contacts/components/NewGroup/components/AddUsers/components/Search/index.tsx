import React, { useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { FiX } from 'react-icons/fi'

import {
  SearchContainer,
  SearchInput,
  SelectUserContainer,
  SelectUset,
} from './styles'

const Search = () => {
  const [search, setSearch] = useState<string>('')
  return (
    <SearchContainer>
      <SelectUserContainer>
        <SelectUset>
          <span>Luiza Marta</span>
          <FiX size={16} color='#FFFFFF' />
        </SelectUset>
        <SelectUset>
          <span>Agenor Molina</span>
          <FiX size={16} color='#FFFFFF' />
        </SelectUset>
        <SelectUset>
          <span>Catarina Oscar</span>
          <FiX size={16} color='#FFFFFF' />
        </SelectUset>
        <SelectUset>
          <span>Felipe Santos</span>
          <FiX size={16} color='#FFFFFF' />
        </SelectUset>
        <SelectUset>
          <span>André Rodrigues</span>
          <FiX size={16} color='#FFFFFF' />
        </SelectUset>
      </SelectUserContainer>
      <SearchInput>
        <SearchFilter setSearch={setSearch} />
      </SearchInput>
    </SearchContainer>
  )
}

export default Search

import React, { useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { FiFilter } from 'react-icons/fi'

import { SearchContainer, SearchFilterInput, SearchInput } from './styles'

const Search = () => {
  const [search, setSearch] = useState<string>('')
  const [filter, setFilter] = useState<boolean>(false)

  return (
    <SearchContainer>
      <SearchInput>
        <SearchFilter setSearch={setSearch} />
      </SearchInput>
      <SearchFilterInput onClick={() => setFilter((prev) => !prev)}>
        <FiFilter
          size={16}
          color='#C8C8C8'
          fill={filter ? '#C8C8C8' : 'transparent'}
        />
      </SearchFilterInput>
    </SearchContainer>
  )
}

export default Search

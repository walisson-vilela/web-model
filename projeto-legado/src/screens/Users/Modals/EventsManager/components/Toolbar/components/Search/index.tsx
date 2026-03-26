import React, { useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

export interface SearchProps {
  search: [string, React.Dispatch<React.SetStateAction<string>>]
}

const Search = (props: SearchProps) => {
  const {
    search: [search, setSearch],
  } = props

  const [searchInput, setSearchInput] = useState<string>('')

  const submit = () => setSearch(searchInput)
  const clear = () => {
    setSearch('')
    setSearchInput('')
  }

  return (
    <MwInput
      type='search'
      placeholder='Pesquisar'
      value={searchInput}
      setValue={setSearchInput}
      onPressEnter={submit}
      clearable={search !== '' && searchInput === search ? clear : undefined}
      icon={{
        icon: {
          type: 'feather',
          icon: 'search',
          onClick: submit,
        },
      }}
      borderless
    />
  )
}

export default Search

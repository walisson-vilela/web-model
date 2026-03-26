import React from 'react'

import { useMainContext } from '../../../../contexts'
import BaseSearch from '../../../Search'

const Search = () => {
  const { search } = useMainContext()

  return (
    <div className='search'>
      <BaseSearch value={search} borderless />
    </div>
  )
}

export default Search

import React, { useCallback, useEffect, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { ReactState } from '../../types'

const Search = (props: { value: ReactState<string>; borderless?: true }) => {
  const {
    value: [search, setSearch],
  } = props

  const [value, setValue] = useState(search)

  useEffect(() => {
    setValue(search)
  }, [search])

  const onSubmit = useCallback(() => {
    setSearch(value)
  }, [value])

  return (
    <MwInput
      type='search'
      placeholder='Pesquisar'
      value={value}
      setValue={setValue}
      onPressEnter={onSubmit}
      icon={{
        icon: {
          type: 'feather',
          icon: 'search',
          onClick: onSubmit,
        },
      }}
      clearable={
        value === '' || value !== search ? undefined : () => setSearch('')
      }
      borderless={props.borderless}
    />
  )
}

export default Search

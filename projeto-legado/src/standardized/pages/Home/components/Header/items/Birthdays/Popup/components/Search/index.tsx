import { useCallback, useEffect, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

const Search = (props: {
  search: [string, React.Dispatch<React.SetStateAction<string>>]
}) => {
  const {
    search: [search, setSearch],
  } = props

  const [value, setValue] = useState(search)

  useEffect(() => {
    setValue(search)
  }, [search])

  const onPressEnter = useCallback(() => setSearch(value), [value])

  return (
    <MwInput
      type='search'
      onPressEnter={onPressEnter}
      setValue={setValue}
      value={value}
      icon={{
        icon: {
          type: 'feather',
          icon: 'search',
          onClick: value || search ? () => setSearch(value) : undefined,
        },
      }}
      clearable={
        search.length === 0 || search !== value
          ? undefined
          : () => {
              setSearch('')
            }
      }
      placeholder='Pesquisar'
      width='149px'
    />
  )
}

export default Search

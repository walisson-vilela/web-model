import React, { useEffect, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

type SearchProps = {
  submitted: [string, React.Dispatch<React.SetStateAction<string>>]
  value?: [string, React.Dispatch<React.SetStateAction<string>>]
  disabled?: boolean
}

const Search = (props: SearchProps) => {
  const [submitted, _setSubmitted] = props.submitted
  const [value, setValue] = props.value || useState(submitted)

  const setSubmitted: typeof _setSubmitted = (s) => {
    _setSubmitted(s)
    setValue(s)
  }

  useEffect(() => {
    setValue(submitted)
  }, [submitted])

  return (
    <MwInput
      type='search'
      placeholder='Pesquisar'
      onPressEnter={() => setSubmitted(value)}
      icon={{
        icon: {
          type: 'feather',
          icon: 'search',
          onClick: value || submitted ? () => setSubmitted(value) : undefined,
          width: '14px',
        },
      }}
      setValue={setValue}
      value={value}
      clearable={
        submitted.length === 0 || submitted !== value
          ? undefined
          : () => {
              setSubmitted('')
            }
      }
      disabled={props.disabled}
    />
  )
}

export default Search

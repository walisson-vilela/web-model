import React, { useEffect } from 'react'

import { MwIcon, MwInput } from '@mw-kit/mw-ui'

type TOpen = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}
type TProps = TOpen & {
  submitted: [string, React.Dispatch<React.SetStateAction<string>>]
  value: [string, React.Dispatch<React.SetStateAction<string>>]
  collapse?: boolean
}

const Search = (props: TProps) => {
  const {
    collapse,
    open: [open, setOpen],
  } = props

  const [submitted, setSubmitted] = props.submitted
  const [value, setValue] = props.value

  useEffect(() => {
    setValue(submitted)
  }, [open, submitted])

  useEffect(() => {
    if (!submitted) setOpen(false)
  }, [submitted])

  return open || !collapse ? (
    <MwInput
      type='search'
      placeholder='Pesquisar'
      onPressEnter={() => setSubmitted(value)}
      icon={{
        icon: {
          type: 'feather',
          icon: 'search',
          onClick: value || submitted ? () => setSubmitted(value) : undefined,
        },
      }}
      setValue={setValue}
      value={value}
      paddingless
      borderless
      clearable={
        submitted.length === 0 || submitted !== value
          ? undefined
          : () => {
              setSubmitted('')
            }
      }
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        border: 'none',
      }}
    />
  ) : (
    <MwIcon
      type='feather'
      icon='search'
      onClick={() => setOpen((prev) => !prev)}
      color={submitted ? 'blue' : undefined}
    />
  )
}

export default Search

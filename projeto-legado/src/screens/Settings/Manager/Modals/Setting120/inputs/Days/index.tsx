import React, { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { BodyInterface } from '../../interfaces'

import { loader } from './functions'

const Days = (props: {
  value: [BodyInterface, React.Dispatch<React.SetStateAction<BodyInterface>>]
}) => {
  const {
    value: [value, setValue],
  } = props

  const optionsLoader = useCallback(
    async (search: string) => {
      return loader(search, value.frequency)
    },
    [value.frequency],
  )

  return (
    <MwInput
      type='select-multiple'
      label='Dias'
      placeholder='Selecione'
      disabled={!value.frequency || value.frequency === 'D'}
      value={value.days.map((v) => v.toString())}
      loader={optionsLoader}
      setValue={(value) => {
        setValue((prev) => {
          return {
            ...prev,
            days: value.map((v) => parseInt(v)),
          }
        })
      }}
      search
    />
  )
}

export default Days

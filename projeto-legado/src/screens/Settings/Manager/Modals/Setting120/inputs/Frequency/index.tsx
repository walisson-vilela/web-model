import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { BodyInterface } from '../../interfaces'

type InputProps = Parameters<typeof MwInput>[0]
type A<T> = T extends { type: 'select' } ? T : never
type SelectProps = A<InputProps>

const Frequency = (
  props: {
    value: [BodyInterface, React.Dispatch<React.SetStateAction<BodyInterface>>]
  } & Pick<SelectProps, 'label' | 'loader' | 'disabled'>,
) => {
  const {
    value: [value, setValue],
  } = props

  return (
    <MwInput
      type='select'
      {...props}
      placeholder=''
      value={value.frequency}
      setValue={(value) => {
        setValue({
          frequency: value as BodyInterface['frequency'],
          days: [],
        })
      }}
    />
  )
}

export default Frequency

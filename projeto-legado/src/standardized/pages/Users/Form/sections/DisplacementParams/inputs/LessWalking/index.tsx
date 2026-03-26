import React, { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { labels } from '../../../../constants'
import useFormContext from '../../../../context'

const LessWalking = () => {
  const {
    form: { control, setValue, isInvalid },
    disabled,
  } = useFormContext()

  return (
    <Controller
      control={control}
      name='less_walking'
      render={({ field: { onChange, ...props } }) => {
        const invalid = isInvalid(props.name)

        const setLessWalking: React.Dispatch<React.SetStateAction<number>> =
          useCallback(
            (value) => {
              const v = typeof value === 'function' ? value(props.value) : value
              setValue(props.name, v)
            },
            [props.value],
          )

        return (
          <MwInput
            {...props}
            {...labels[props.name]}
            disabled={disabled}
            invalid={invalid}
            type='range'
            setValue={setLessWalking}
            markers={{
              markers: [500, 1000, 1500, 2000],
              strict: false,
              position: 'top',
              min: 0,
              max: 2000,
            }}
            step='100'
            width='440px'
          />
        )
      }}
    />
  )
}

export default LessWalking

import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { labels } from '../../../../constants'
import useFormContext from '../../../../context'

const Imei = () => {
  const { form, disabled } = useFormContext()

  const { setValue, isInvalid } = form

  return (
    <Controller
      control={form.control}
      name='imei'
      render={({ field: props }) => {
        const checked = props.value === null
        const invalid = isInvalid(props.name)

        return (
          <React.Fragment>
            <MwInput
              {...props}
              {...labels[props.name]}
              type='text'
              value={props.value || ''}
              disabled={disabled || checked}
              invalid={invalid}
              width='auto'
            />

            <MwInput
              type='checkbox'
              label='Obter automáticamente'
              onChange={(e) =>
                setValue(props.name, e.target.checked ? null : '')
              }
              disabled={disabled}
              invalid={invalid}
              checked={checked}
              bordered
            />
          </React.Fragment>
        )
      }}
    />
  )
}

export default Imei

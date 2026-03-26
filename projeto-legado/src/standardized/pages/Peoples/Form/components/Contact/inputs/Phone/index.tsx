import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { Form } from '../../../../interfaces'
import { labels } from '../../../../labels'

const Phone = (props: { name: 'phone' | 'phone_2' }) => {
  const { name } = props
  const { form, setValueOptions, isInvalid } = useFormContext()

  const setValue = useCallback(
    (value: Form[typeof name]) => {
      form.setValue(name, value, setValueOptions)
    },
    [name, form.setValue],
  )

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, ...props } }) => {
        /**
         * NOTE: it is required to remove the onChange property, otherwise react-hook-form will
         * control the value that is visible on the input, instead of the clean value with the ddi
         */

        const invalid = isInvalid(name)

        const { label, required, placeholder } = labels[name]

        return (
          <MwInput
            {...props}
            type='phone'
            label={label}
            required={required}
            invalid={invalid}
            setValue={setValue}
            placeholder={{ br: placeholder }}
            value={props.value || ''}
          />
        )
      }}
    />
  )
}

export default Phone

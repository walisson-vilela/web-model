import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { Form } from '../../../../interfaces'
import { PropsInputs } from '../interfaces'

const placeholder = '(00) 00000-0000'

const Phone = (props: PropsInputs) => {
  const { form, isInvalid, setValueOptions } = useFormContext()

  const { label } = props

  if ('name' in props) {
    const { name } = props

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

          return (
            <MwInput
              {...props}
              type='phone'
              invalid={isInvalid('phone')}
              label={label}
              setValue={setValue}
              placeholder={{ br: placeholder }}
            />
          )
        }}
      />
    )
  } else {
    const [value, setValue] = props.value

    return (
      <MwInput
        type='phone'
        value={value}
        setValue={setValue}
        invalid={props.invalid}
        label={label}
        placeholder={{ br: placeholder }}
      />
    )
  }
}

export default Phone

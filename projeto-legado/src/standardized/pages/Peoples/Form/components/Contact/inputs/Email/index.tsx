import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { labels } from '../../../../labels'

const Email = () => {
  const { form } = useFormContext()
  const { isInvalid } = form

  return (
    <Controller
      name='email'
      control={form.control}
      render={({ field: props }) => {
        const { label, placeholder, required } = labels[props.name]

        return (
          <MwInput
            {...props}
            type='text'
            label={label}
            placeholder={placeholder}
            required={required}
            invalid={isInvalid(props.name)}
            value={props.value || ''}
          />
        )
      }}
    />
  )
}

export default Email

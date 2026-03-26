import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { PropsInputs } from '../interfaces'

const placeholder = 'pessoa@email.com.br'

const Email = (props: PropsInputs) => {
  const { form, isInvalid } = useFormContext()

  const { label } = props

  if ('name' in props) {
    const { name } = props

    return (
      <Controller
        name={name}
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            invalid={isInvalid('email')}
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    )
  } else {
    const [value, setValue] = props.value

    return (
      <MwInput
        type='email'
        value={value}
        setValue={setValue}
        invalid={props.invalid}
        label={label}
        placeholder={placeholder}
      />
    )
  }
}

export default Email

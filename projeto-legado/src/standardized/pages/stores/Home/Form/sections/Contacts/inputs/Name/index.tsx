import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { PropsInputs } from '../interfaces'

const Name = (props: PropsInputs) => {
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
            invalid={isInvalid(name)}
            label={label}
            placeholder={label}
          />
        )}
      />
    )
  } else {
    const [value, setValue] = props.value

    return (
      <MwInput
        type='text'
        value={value}
        setValue={setValue}
        invalid={props.invalid}
        label={label}
        placeholder={label}
      />
    )
  }
}

export default Name

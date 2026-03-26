import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { labels } from '../../labels'

const Name = () => {
  const { form, isInvalid } = useFormContext()

  const { control } = form

  return (
    <MwGrid.Col width='4'>
      <Controller
        control={control}
        name='name'
        render={({ field: props }) => {
          const { label, required, placeholder } = labels[props.name]

          return (
            <MwInput
              {...props}
              type='text'
              label={label}
              placeholder={placeholder}
              value={props.value || ''}
              invalid={isInvalid(props.name)}
              required={required}
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Name

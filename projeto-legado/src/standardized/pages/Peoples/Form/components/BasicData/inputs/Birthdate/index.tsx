import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { getMaxBirthdate } from '../../../../schema'
import { labels } from '../../labels'

const Birthdate = () => {
  const { form, isInvalid } = useFormContext()
  const { control, setValue } = form

  return (
    <MwGrid.Col width='2'>
      <Controller
        name='birthdate'
        control={control}
        render={({ field: props }) => {
          const { label, required, placeholder } = labels[props.name]

          return (
            <MwInput
              {...props}
              type='date'
              label={label}
              placeholder={placeholder}
              invalid={isInvalid(props.name)}
              required={required}
              setValue={(value) => {
                setValue(props.name, value)
              }}
              max={getMaxBirthdate()}
              picker
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Birthdate

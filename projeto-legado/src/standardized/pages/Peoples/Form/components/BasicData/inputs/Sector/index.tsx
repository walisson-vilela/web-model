import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { labels } from '../../labels'

const Sector = () => {
  const { form, isInvalid } = useFormContext()
  const { control } = form

  return (
    <MwGrid.Col width='4'>
      <Controller
        control={control}
        name='sector'
        render={({ field: props }) => {
          const { label, required, placeholder } = labels[props.name]
          return (
            <MwInput
              {...props}
              type='text'
              label={label}
              placeholder={placeholder}
              invalid={isInvalid(props.name)}
              setValue={props.onChange}
              required={required}
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Sector

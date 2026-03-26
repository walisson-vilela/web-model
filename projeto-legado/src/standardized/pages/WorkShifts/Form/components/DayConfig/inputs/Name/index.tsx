import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { InputLabel } from '../../../../style'
import { labels } from '../../labels'

const Name = () => {
  const { auxForm, isAuxInvalid } = useFormContext()

  const { control, setValue } = auxForm

  return (
    <MwGrid.Col width='auto'>
      <Controller
        control={control}
        name='name'
        render={({ field: props }) => {
          const { label, required, placeholder } = labels[props.name]

          return (
            <InputLabel>
              <MwInput
                {...props}
                inputWidth='114px'
                type='text'
                label={label}
                placeholder={placeholder}
                value={props.value || ''}
                invalid={isAuxInvalid(props.name)}
                required={required}
                onChange={(value) => {
                  setValue(props.name, value.target.value.substring(0, 120))
                }}
              />
            </InputLabel>
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Name

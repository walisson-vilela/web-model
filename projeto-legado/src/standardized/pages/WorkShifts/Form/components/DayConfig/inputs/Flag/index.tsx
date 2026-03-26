import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import type { SelectLoader, SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { InputLabel } from '../../../../style'
import { labels } from '../../labels'

const options: SelectOption[] = [
  {
    label: 'Sim',
    value: 'true',
    data: {},
  },
  { label: 'Não', value: 'false', data: {} },
]

const loader: SelectLoader = async () => options

const Flag = () => {
  const { auxForm, form, isAuxInvalid } = useFormContext()
  const { control, setValue } = auxForm

  const formValues = form.getValues()

  return (
    <MwGrid.Col width='auto'>
      <Controller
        control={control}
        name='flag'
        render={({ field: props }) => {
          const { required, placeholder } = labels[props.name]

          return (
            <InputLabel>
              <MwInput
                {...props}
                type='select'
                inputWidth='110px'
                label={
                  formValues.electronic_point
                    ? 'Pré-Assinalado'
                    : 'Bloqueio Acesso'
                }
                placeholder={placeholder}
                value={options[props.value ? 0 : 1]}
                invalid={isAuxInvalid(props.name)}
                required={required}
                loader={loader}
                setValue={(value) => {
                  if (value !== 'true' && value !== 'false') return
                  if (value === props.value.toString()) return
                  setValue(props.name, value === 'true')
                }}
              />
            </InputLabel>
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Flag

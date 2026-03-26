import { MwInput } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { booleanOrDefault } from '../../../../../../../../utils/Formatters'
import { labels } from '../../../../constants'
import useFormContext from '../../../../context'

const loader: SelectLoader = async () => [
  {
    label: 'Corporativo',
    data: {},
    value: '0',
  },
  {
    label: 'Pessoal',
    data: {},
    value: '1',
  },
]

const PersonalMobile = () => {
  const { form, disabled } = useFormContext()

  const { setValue, isInvalid } = form

  return (
    <Controller
      name='personal_mobile'
      control={form.control}
      render={({ field: props }) => {
        const invalid = isInvalid(props.name)
        return (
          <MwInput
            {...props}
            {...labels[props.name]}
            disabled={disabled}
            invalid={invalid}
            type='select'
            loader={loader}
            value={props.value === null ? '0' : props.value ? '1' : '0'}
            setValue={(value) => {
              const newValue = booleanOrDefault(value)
              if (newValue === null) return
              setValue(props.name, newValue)
            }}
          />
        )
      }}
    />
  )
}

export default PersonalMobile

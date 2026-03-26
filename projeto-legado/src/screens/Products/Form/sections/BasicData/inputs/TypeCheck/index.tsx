import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useContext from '../../../../context'
import { Form } from '../../../../interfaces'

interface IType {
  value: Form['type']
  label: string
}

const toggle: { [K in Form['type']]: Exclude<Form['type'], K> } = {
  COMPETITOR: 'OWN',
  OWN: 'COMPETITOR',
}

const Type = (props: IType) => {
  const { label, value } = props
  const { form, setValueOptions, isInvalid } = useContext()

  const { setValue, control } = form

  return (
    <MwGrid.Col width='auto' spacing={{ left: 's3', bottom: '0', top: '0' }}>
      <Controller
        control={control}
        name='type'
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='radio'
            label={label}
            checked={props.value === value}
            invalid={isInvalid('type')}
            onChange={(e) => {
              setValue(
                'type',
                e.target.checked ? value : toggle[props.value],
                setValueOptions,
              )
              setValue('brand_id', null, setValueOptions)
            }}
          />
        )}
      />
    </MwGrid.Col>
  )
}

export default Type

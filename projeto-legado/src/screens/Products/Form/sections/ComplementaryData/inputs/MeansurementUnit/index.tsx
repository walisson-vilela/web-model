import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { SelectLoader, SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import useContext from '../../../../context'
import { Form } from '../../../../interfaces'

export const options: SelectOption<{ abreviation: string }>[] = [
  { label: 'Quilograma (kg)', value: 'KG', data: { abreviation: 'Kg' } },
  { label: 'Litro (l)', value: 'LITRO', data: { abreviation: 'L' } },
  { label: 'Unidade (un)', value: 'UNID', data: { abreviation: 'Un' } },
  { label: 'Pacote (pct)', value: 'PACOTE', data: { abreviation: 'Pct' } },
]

const loader: SelectLoader<{ abreviation: string }> = async () => options

const MeansurementUnit = () => {
  const { form, isInvalid, setValueOptions } = useContext()

  const { control, setValue } = form

  return (
    <MwGrid.Col width='2'>
      <Controller
        control={control}
        name='measurement_unit'
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='select'
            placeholder='Selecione'
            label='Unidade de Medida'
            invalid={isInvalid(props.name)}
            value={props.value || ''}
            setValue={(value) => {
              if (value) {
                setValue(
                  props.name,
                  value as Form['measurement_unit'],
                  setValueOptions,
                )
              } else {
                setValue(props.name, null, setValueOptions)
                setValue('measurement', null, setValueOptions)
              }
            }}
            onClear={() => {
              setValue(props.name, null, setValueOptions)
              setValue('measurement', null, setValueOptions)
            }}
            loader={loader as never as SelectLoader}
          />
        )}
      />
    </MwGrid.Col>
  )
}

export default MeansurementUnit

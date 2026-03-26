import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import useContext from '../../../../context'

const loader: SelectLoader = async () => ({
  lastPage: true,
  options: [
    { label: 'Sim', value: '1', data: {} },
    { label: 'Não', value: '0', data: {} },
  ],
})

const NotifyPrice = () => {
  const { form, isInvalid, setValueOptions } = useContext()

  const { control, setValue, trigger } = form

  return (
    <MwGrid.Col width='2'>
      <Controller
        control={control}
        name='notify_price'
        render={({ field: props }) => (
          <MwInput
            {...props}
            width='100%'
            type='select'
            label='Notificar Registros de Preço'
            placeholder='Selecione'
            invalid={isInvalid(props.name)}
            value={props.value === null ? '' : props.value ? '1' : '0'}
            setValue={(value) => {
              if (value) {
                setValue(props.name, value === '1', setValueOptions)
              } else {
                setValue(props.name, null, setValueOptions)
                setValue('price_min', null, setValueOptions)
                setValue('price_max', null, setValueOptions)
              }
            }}
            onClear={() => {
              setValue(props.name, null, setValueOptions)
              setValue('price_min', null, setValueOptions)
              setValue('price_max', null, setValueOptions)
            }}
            loader={loader}
          />
        )}
      />
    </MwGrid.Col>
  )
}

export default NotifyPrice

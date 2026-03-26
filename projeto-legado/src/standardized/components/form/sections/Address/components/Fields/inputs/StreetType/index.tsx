import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import addressType from '../../../../../../../../constants/addressType'
import useAddessContext from '../../../../context'

const StreetType = () => {
  const { form, showTitle, invalidCheck, setValueOptions, modalMode } =
    useAddessContext()

  const { control, setValue } = form

  return (
    <Controller
      control={control}
      name='street_type'
      render={({ field: props }) =>
        modalMode ? (
          <span>{props.value}</span>
        ) : (
          <MwInput
            {...props}
            type='select'
            placeholder='Selecione'
            label={showTitle ? 'Tipo de Logradouro' : ''}
            required
            disabled
            invalid={invalidCheck(props.name)}
            width='100%'
            setValue={(value) => setValue(props.name, value, setValueOptions)}
            loader={async () => ({
              lastPage: true,
              options: addressType.map((type) => ({
                label: type,
                value: type,
                data: {},
              })),
            })}
          />
        )
      }
    />
  )
}

export default StreetType

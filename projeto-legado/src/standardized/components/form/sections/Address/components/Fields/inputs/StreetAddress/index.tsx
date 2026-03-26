import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useAddessContext from '../../../../context'

const StreetAddress = () => {
  const { form, showTitle, invalidCheck, modalMode } = useAddessContext()

  const { control } = form

  return (
    <Controller
      control={control}
      name='street_address'
      render={({ field: props }) =>
        modalMode ? (
          <span>{props.value}</span>
        ) : (
          <MwInput
            {...props}
            type='text'
            label={showTitle ? 'Endereço' : ''}
            placeholder='Endereço'
            required
            disabled
            invalid={invalidCheck(props.name)}
          />
        )
      }
    />
  )
}

export default StreetAddress

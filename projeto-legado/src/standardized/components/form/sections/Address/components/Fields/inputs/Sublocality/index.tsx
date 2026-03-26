import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useAddessContext from '../../../../context'

const Sublocality = () => {
  const { form, invalidCheck, showTitle, modalMode } = useAddessContext()

  const { control } = form

  return (
    <Controller
      control={control}
      name='sublocality'
      render={({ field: props }) =>
        modalMode ? (
          <span>{props.value ? `${props.value},` : ''}</span>
        ) : (
          <MwInput
            {...props}
            type='text'
            label={showTitle ? 'Bairro' : ''}
            placeholder='Bairro'
            required
            disabled
            invalid={invalidCheck(props.name)}
          />
        )
      }
    />
  )
}

export default Sublocality

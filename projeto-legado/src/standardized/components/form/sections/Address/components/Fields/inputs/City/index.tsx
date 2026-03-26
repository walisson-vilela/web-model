import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useAddessContext from '../../../../context'

const City = () => {
  const { form, invalidCheck, showTitle, modalMode } = useAddessContext()

  const { control } = form

  return (
    <Controller
      control={control}
      name='city'
      render={({ field: props }) =>
        modalMode ? (
          <span>{props.value ? `${props.value} -` : ''}</span>
        ) : (
          <MwInput
            {...props}
            type='text'
            label={showTitle ? 'Cidade' : ''}
            placeholder='Cidade'
            required
            disabled
            invalid={invalidCheck(props.name)}
          />
        )
      }
    />
  )
}

export default City

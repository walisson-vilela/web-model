import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useAddessContext from '../../../../context'

const Complement = () => {
  const { form, invalidCheck, disabled, showTitle } = useAddessContext()

  const { control } = form

  return (
    <Controller
      control={control}
      name='complement'
      render={({ field: props }) => (
        <MwInput
          {...props}
          type='text'
          label={showTitle ? 'Complemento' : ''}
          placeholder='Ex.: Casa B'
          invalid={invalidCheck(props.name)}
          disabled={disabled}
        />
      )}
    />
  )
}

export default Complement

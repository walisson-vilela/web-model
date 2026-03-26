import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useWithFormContext } from '../../../../context'
import * as S from '../../styled'

const StreetAddress = () => {
  const {
    form,
    fieldIsInvalid,
    fieldsValidate,
    wasSearched: [, setWasSearched],
  } = useWithFormContext()

  return (
    <S.ColInputs>
      <Controller
        name='street_address'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            placeholder='Ex.: Brasil'
            label='Logradouro'
            invalid={fieldIsInvalid(props.name as 'street_address')}
            setValue={() => {
              setWasSearched(false)
            }}
            required={fieldsValidate(props.name as 'street_address')}
          />
        )}
      />
    </S.ColInputs>
  )
}

export default StreetAddress

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useWithFormContext } from '../../../../context'
import * as S from '../../styled'

const StreetNumber = () => {
  const {
    form,
    fieldIsInvalid,
    fieldsValidate,
    wasSearched: [, setWasSearched],
  } = useWithFormContext()

  return (
    <S.ColInputs width='4'>
      <Controller
        name='street_number'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label='N°'
            invalid={fieldIsInvalid(props.name as 'street_number')}
            setValue={() => {
              setWasSearched(false)
            }}
            required={fieldsValidate(props.name as 'street_number')}
            mask={[/\D/g, '']}
          />
        )}
      />
    </S.ColInputs>
  )
}

export default StreetNumber

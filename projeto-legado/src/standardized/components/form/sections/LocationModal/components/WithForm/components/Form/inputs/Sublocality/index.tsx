import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useWithFormContext } from '../../../../context'
import * as S from '../../styled'

const Sublocality = () => {
  const {
    form,
    fieldIsInvalid,
    fieldsValidate,
    wasSearched: [, setWasSearched],
  } = useWithFormContext()

  return (
    <S.ColInputs>
      <Controller
        name='sublocality'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            placeholder='Bairro'
            label='Bairro'
            invalid={fieldIsInvalid(props.name as 'sublocality')}
            setValue={() => {
              setWasSearched(false)
            }}
            required={fieldsValidate(props.name as 'sublocality')}
          />
        )}
      />
    </S.ColInputs>
  )
}

export default Sublocality

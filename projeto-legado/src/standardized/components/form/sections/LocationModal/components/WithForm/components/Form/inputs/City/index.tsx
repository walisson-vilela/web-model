import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useWithFormContext } from '../../../../context'
import * as S from '../../styled'

const City = () => {
  const {
    form,
    fieldIsInvalid,
    fieldsValidate,
    wasSearched: [, setWasSearched],
  } = useWithFormContext()

  return (
    <S.ColInputs>
      <Controller
        name='city'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            placeholder='Ex.: Belo Horizonte'
            label='Cidade'
            invalid={fieldIsInvalid(props.name as 'city')}
            required={fieldsValidate(props.name as 'city')}
            setValue={() => {
              setWasSearched(false)
            }}
          />
        )}
      />
    </S.ColInputs>
  )
}

export default City

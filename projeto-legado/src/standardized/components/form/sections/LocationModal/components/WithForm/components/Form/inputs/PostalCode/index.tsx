import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { cep as formatCEP } from '../../../../../../../../../../../utils/Formatters'
import { useWithFormContext } from '../../../../context'
import * as S from '../../styled'

const PostalCode = () => {
  const {
    form,
    wasSearched: [, setWasSearched],
    fieldIsInvalid,
  } = useWithFormContext()
  return (
    <S.ColInputs width='4'>
      <Controller
        name='postal_code'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            placeholder='00000-000'
            label='CEP'
            invalid={fieldIsInvalid(props.name as 'postal_code')}
            mask={formatCEP}
            setValue={() => {
              setWasSearched(false)
            }}
            disabled={true}
          />
        )}
      />
    </S.ColInputs>
  )
}

export default PostalCode

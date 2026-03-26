import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../../utils/hooks'
import useContext from '../../../../context'
import { Form } from '../../../../interfaces'
import * as S from '../../styles'

const Code = () => {
  const { form, isInvalid, data } = useContext()

  const { watch, control } = form

  const type = watch('type')

  const codeCheck = useEndpointValidation<Form>({
    endpoint: '/v1/tr/products/check-code',
    key: 'code',
    formKey: 'code',
    formInstance: form,
    exceptID: data && data.id,
    properties: { type },

    messages: {
      invalid: 'O código já está sendo utilizado',
    },
  })

  return (
    <MwGrid.Col width='2'>
      <Controller
        control={control}
        name='code'
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label='Código'
            required={type === 'OWN'}
            placeholder='Código do Produto'
            loading={codeCheck.loading}
            invalid={isInvalid('code')}
            mask={[/\D/g, '']}
          />
        )}
      />

      <S.ErrorMessage children={codeCheck.message} />
    </MwGrid.Col>
  )
}

export default Code

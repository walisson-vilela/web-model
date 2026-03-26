import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../../utils/hooks'
import useContext from '../../../../context'
import { Form } from '../../../../interfaces'
import * as S from '../../styles'

const Name = () => {
  const { form, isInvalid, data } = useContext()

  const { control } = form

  const nameCheck = useEndpointValidation<Form>({
    endpoint: '/v1/tr/products/check-name',
    formKey: 'name',
    formInstance: form,
    exceptID: data && data.id,
    minLength: 3,
    messages: {
      invalid: 'O nome já está sendo utilizado',
    },
  })

  return (
    <MwGrid.Col width='5'>
      <Controller
        control={control}
        name='name'
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label='Nome'
            required
            placeholder='Exemplo: Iogurte Pote Morango 500g'
            loading={nameCheck.loading}
            invalid={isInvalid('name')}
          />
        )}
      />

      <S.ErrorMessage children={nameCheck.message} />
    </MwGrid.Col>
  )
}

export default Name

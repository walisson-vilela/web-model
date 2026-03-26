import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../../../../../utils/hooks'
import useContext from '../../../../../../context'
import { Form as FormInterface } from '../../../../../../interfaces'
import { ErrorMessage } from '../../styles'

const Name = () => {
  const { form, data, isInvalid } = useContext()

  const nameCheck = useEndpointValidation<FormInterface>({
    endpoint: '/v1/tr/brands/check-name',
    formKey: 'name',
    formInstance: form,
    exceptID: data && data.id,
    minLength: 3,
    messages: {
      invalid: 'O nome informado já está sendo utilizado.',
    },
  })

  return (
    <>
      <Controller
        control={form.control}
        name='name'
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label='Nome da Marca'
            required
            placeholder='Exemplo: Coca-Cola'
            loading={nameCheck.loading}
            invalid={isInvalid('name')}
          />
        )}
      />

      <ErrorMessage>
        {nameCheck.isValid === false && nameCheck.message}
      </ErrorMessage>
    </>
  )
}

export default Name

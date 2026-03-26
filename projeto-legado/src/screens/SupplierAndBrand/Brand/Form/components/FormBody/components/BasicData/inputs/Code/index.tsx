import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../../../../../utils/hooks'
import useContext from '../../../../../../context'
import { Form as FormInterface } from '../../../../../../interfaces'
import { ErrorMessage } from '../../styles'

const Code = () => {
  const { form, data, isInvalid } = useContext()

  const { watch } = form

  const codeCheck = useEndpointValidation<FormInterface>({
    endpoint: '/v1/tr/brands/check-code',
    key: 'code',
    formKey: 'code',
    formInstance: form,
    exceptID: data && data.id,
    messages: {
      invalid: 'O código já esta sendo utilizado',
    },
  })

  const type = watch('type')

  return (
    <>
      <Controller
        control={form.control}
        name='code'
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label='Código'
            required={type === 'OWN'}
            placeholder='Código da Marca'
            loading={codeCheck.loading}
            invalid={isInvalid('code')}
            mask={[/\D/g, '']}
          />
        )}
      />

      <ErrorMessage>
        {codeCheck.isValid === false && codeCheck.message}
      </ErrorMessage>
    </>
  )
}

export default Code

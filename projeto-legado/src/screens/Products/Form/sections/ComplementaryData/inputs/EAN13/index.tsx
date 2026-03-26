import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../../utils/hooks'
import useContext from '../../../../context'
import { Form } from '../../../../interfaces'
import * as S from '../../../../styles'

const EAN13 = () => {
  const { form, isInvalid, data } = useContext()

  const {
    watch,
    formState: { errors },
    control,
  } = form

  const type = watch('type')

  const EAN13Check = useEndpointValidation<Form>({
    endpoint: 'v1/tr/products/check-ean-13',
    formKey: 'ean_13',
    key: 'ean_13',
    formInstance: form,
    exceptID: data && data.id,
    minLength: 13,
    messages: {
      invalid: 'O código já está sendo utilizado',
    },
  })

  return (
    <MwGrid.Col width='2'>
      <Controller
        control={control}
        name='ean_13'
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label='EAN 13'
            required={type === 'OWN'}
            maxLength={13}
            mask={[/\D/g, '']}
            placeholder='1234567890123'
            loading={EAN13Check.loading}
            invalid={isInvalid('ean_13')}
          />
        )}
      />

      <S.ErrorMessage>
        {isInvalid('ean_13')
          ? errors.ean_13.message.toString()
          : EAN13Check.message.toString()}
      </S.ErrorMessage>
    </MwGrid.Col>
  )
}

export default EAN13

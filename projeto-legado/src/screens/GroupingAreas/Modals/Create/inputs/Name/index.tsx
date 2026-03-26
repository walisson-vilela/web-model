import { useEffect } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useCreateContext from '../../context'

import { ErrorMessage } from './styles'

const Name = () => {
  const { form, nameCheck, data } = useCreateContext()

  useEffect(() => {
    form.getValues('country_id')
      ? nameCheck.trigger()
      : form.setValue('name', '', { shouldDirty: true, shouldValidate: true })
  }, [form.watch('country_id')])

  return (
    <>
      <Controller
        name='name'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label={
              data ? 'Nome do Agrupamento' : 'Atribua um nome ao Agrupamento'
            }
            disabled={!form.watch('country_id')}
            placeholder='Exemplo: Região Metropolitana de BH'
            loading={nameCheck.loading}
            invalid={nameCheck.isValid === false}
            required
          />
        )}
      />

      <ErrorMessage children={nameCheck.message} />
    </>
  )
}

export default Name

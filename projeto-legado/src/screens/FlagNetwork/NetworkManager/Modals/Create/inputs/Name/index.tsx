import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useCreateContext from '../../context'

import { ErrorMessage } from './styles'

const Name = () => {
  const { form, nameCheck, editData, isInvalid } = useCreateContext()

  return (
    <>
      <Controller
        name='name'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label={!editData ? 'Atribua um nome para a rede' : 'Nome da Rede'}
            disabled={!form.watch('parent_id')}
            placeholder='Exemplo: Extra'
            loading={nameCheck.loading}
            invalid={nameCheck.isValid === false || isInvalid('name')}
            required
          />
        )}
      />

      <ErrorMessage children={nameCheck.message} />
    </>
  )
}

export default Name

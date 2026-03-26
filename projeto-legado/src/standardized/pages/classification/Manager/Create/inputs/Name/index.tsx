import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import {
  useEndpointValidation,
  useHookFormsAsState,
} from '../../../../../../../utils/hooks'
import useFormContext from '../../context'
import { Form } from '../../interfaces'
import { Error } from '../../styles'

const name = 'name'

const SceneryId = () => {
  const { data, form } = useFormContext()

  const {
    formState: { errors },
  } = form

  const [value, setValue] = useHookFormsAsState(name, form)
  const [scenery_id] = useHookFormsAsState('scenery_id', form)

  const nameCheck = useEndpointValidation<Form>({
    endpoint: '/v1/classifications/check-name',
    formKey: name,
    formInstance: form,
    exceptID: data && data.id,
    messages: {
      invalid: 'O nome informado já está sendo utilizado.',
    },
    properties: { scenery_id },
  })

  return (
    <div>
      <Controller
        control={form.control}
        name={name}
        render={(field) => (
          <MwInput
            {...field}
            type='text'
            label='Defina o Motivo ou Classificação'
            placeholder='Exemplo: Fora do Padrão'
            name={name}
            value={value}
            setValue={setValue}
            invalid={name in errors}
            disabled={data?.default}
            loading={nameCheck.loading}
            required
          />
        )}
      />

      <Error children={errors[name] && errors[name].message} />
    </div>
  )
}

export default SceneryId

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useHookFormsAsState } from '../../../../../../../utils/hooks'
import useFormContext from '../../context'

const name = 'required_file'
const CheckAttachment = () => {
  const {
    form,
    scenery: [scenery],
  } = useFormContext()

  const {
    formState: { errors },
  } = form

  const [value, setValue] = useHookFormsAsState(name, form)

  return (
    <div>
      {scenery.can_upload_file && (
        <Controller
          control={form.control}
          name={name}
          render={(field) => (
            <MwInput
              {...field}
              type='checkbox'
              label='Anexo obrigatório'
              name={name}
              checked={value}
              onChange={() => {
                setValue((prev) => !prev)
              }}
              invalid={name in errors}
            />
          )}
        />
      )}
    </div>
  )
}
export default CheckAttachment

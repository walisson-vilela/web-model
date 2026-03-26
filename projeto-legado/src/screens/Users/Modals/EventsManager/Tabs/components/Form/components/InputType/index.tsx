import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { TYPES } from '../../constants'
import useFormContext from '../../context'

interface IInputType {
  type: 'Definitivo' | 'Temporário'
}

const InputType = (props: IInputType) => {
  const { type } = props

  const { form } = useFormContext()

  const { isInvalid, setValue, reset } = form

  return (
    <Controller
      name='type'
      control={form.control}
      render={({ field: props }) => (
        <MwInput
          type='radio'
          {...props}
          label={type}
          value={type === 'Definitivo' ? TYPES.DEFINITIVE : TYPES.TEMPORARY}
          invalid={isInvalid(props.name)}
          checked={
            form.watch(props.name) ===
            (type === 'Definitivo' ? TYPES.DEFINITIVE : TYPES.TEMPORARY)
          }
          onChange={(e) => {
            reset()
            const value =
              type === 'Definitivo' ? TYPES.DEFINITIVE : TYPES.TEMPORARY
            setValue(props.name, value)
          }}
        />
      )}
    />
  )
}

export default InputType

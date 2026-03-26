import { MwInput } from '@mw-kit/mw-ui'

import { keys } from '../../../../../../../../utils/Formatters'
import { isKeyOf } from '../../../../../../../../utils/Validators'
import { CALENDAR_EVENT_TYPES } from '../../../../constants'
import useFormContext from '../../context'
import type { FormType } from '../../types'

const getOption = (value: keyof typeof CALENDAR_EVENT_TYPES) => ({
  label: CALENDAR_EVENT_TYPES[value],
  value: value,
  data: {},
})

const loader = async () => keys(CALENDAR_EVENT_TYPES).map(getOption)

const Type = () => {
  const { useField } = useFormContext()

  const [value, setValue] = useField('type')

  return (
    <div>
      <MwInput
        type='select'
        label='Tipo de Evento'
        placeholder='Selecione'
        loader={loader}
        setValue={(v) => setValue(v as FormType)}
        value={isKeyOf(CALENDAR_EVENT_TYPES, value) ? getOption(value) : value}
        width='165px'
        required
      />
    </div>
  )
}

export default Type

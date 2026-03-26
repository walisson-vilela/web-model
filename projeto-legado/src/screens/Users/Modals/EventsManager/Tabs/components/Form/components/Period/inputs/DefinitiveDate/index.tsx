import { MwInput } from '@mw-kit/mw-ui'

import useFormContext from '../../../../context'
import { PeriodInputProps } from '../../types'

const DefinitiveDate = (props: PeriodInputProps) => {
  const { form } = useFormContext()
  const { watch, setValue, isInvalid } = form

  const { minDate, maxDate, onChangeMonth, getDay } = props

  const start = watch('start')

  return (
    <MwInput
      value={start}
      setValue={(v) => {
        setValue('start', v)
        setValue('end', '')
      }}
      type='datetime'
      label='Defina a Data'
      min={minDate}
      max={maxDate}
      picker={{
        position: 'right top',
        time: (v) => {
          return v && v.getTime() === minDate.getTime() ? undefined : {}
        },
        getDay,
        onChangeMonth,
      }}
      invalid={isInvalid('start')}
    />
  )
}
export default DefinitiveDate

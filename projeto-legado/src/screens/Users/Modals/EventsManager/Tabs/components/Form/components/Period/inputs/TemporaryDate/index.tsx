import { MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'

import useFormContext from '../../../../context'
import { PeriodInputProps } from '../../types'

const TemporaryDate = (props: PeriodInputProps) => {
  const { form } = useFormContext()

  const { minDate, maxDate, onChangeMonth, getDay } = props

  const { watch, isInvalid, isRequired, setValue } = form

  const start = watch('start')
  const end = watch('end')

  const value: [string, string] = [
    start
      ? moment(start, 'DD/MM/YYYY HH:mm').format('YYYY/MM/DD HH:mm:ss')
      : '',
    end ? moment(end, 'DD/MM/YYYY HH:mm').format('YYYY/MM/DD HH:mm:ss') : '',
  ]

  return (
    <MwInput
      type='date-interval-picker'
      label='Defina o Período'
      value={value}
      setValue={([start, end]) => {
        setValue(
          'start',
          start ? moment(start).format('DD/MM/YYYY HH:mm') : start,
        )
        setValue('end', end ? moment(end).format('DD/MM/YYYY HH:mm') : end)
      }}
      invalid={isInvalid('start') || isInvalid('end')}
      required={isRequired('start') && isRequired('end')}
      min={minDate}
      max={maxDate}
      calendar={{
        time: true,
        onChangeMonth,
        getDay,
        position: 'left top',
      }}
      only='custom'
    />
  )
}

export default TemporaryDate

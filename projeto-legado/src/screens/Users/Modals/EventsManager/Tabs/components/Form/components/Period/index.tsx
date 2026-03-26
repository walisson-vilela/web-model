import { useCallback } from 'react'

import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import { TYPES, getMaxDate, getMinDate } from '../../constants'
import useFormContext from '../../context'
import { getDaysWithEventsByMonth } from '../../services'

import * as Inputs from './inputs'
import { PeriodInputProps } from './types'

const Period = () => {
  const {
    user_id,
    form,
    eventDates: [eventDates, setEventDates],
  } = useFormContext()
  const { watch } = form
  const type = watch('type')

  const minDate = getMinDate(type)
  const maxDate = getMaxDate()

  const onChangeMonth: PeriodInputProps['onChangeMonth'] = useCallback(
    async (calendar) => {
      const key = `${calendar.year}-${calendar.month}`
      if (eventDates[key] !== undefined) return

      try {
        const dates = await getDaysWithEventsByMonth(
          user_id,
          calendar.year,
          calendar.month + 1,
        )
        setEventDates((prev) => ({
          ...prev,
          [key]: dates,
        }))
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }
    },
    [eventDates],
  )

  const getDay: PeriodInputProps['getDay'] = useCallback(
    (day) => {
      const key = `${day.getFullYear()}-${day.getMonth()}`

      const isEventDay = (eventDates[key] || []).some(
        (d) =>
          d.getFullYear() === day.getFullYear() &&
          d.getMonth() === day.getMonth() &&
          d.getDate() === day.getDate(),
      )

      return {
        indicator: isEventDay ? 'danger' : undefined,
      }
    },
    [eventDates],
  )

  const Component =
    type === TYPES.DEFINITIVE ? Inputs.DefinitiveDate : Inputs.TemporaryDate

  return (
    <div style={{ padding: '0', width: '100%' }}>
      <Component
        minDate={minDate}
        maxDate={maxDate}
        onChangeMonth={onChangeMonth}
        getDay={getDay}
      />
    </div>
  )
}

export default Period

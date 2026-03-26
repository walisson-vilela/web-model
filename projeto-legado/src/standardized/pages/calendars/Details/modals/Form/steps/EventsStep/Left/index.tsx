import { useCallback, useMemo, useState } from 'react'

import { MwButton, MwCalendar, MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'

import useFormContext from '../../../context'
import { sortEvents } from '../../../functions'
import {
  getEventByDay,
  getRange,
  isAllDay,
  isValidIntervalTime,
  splitTime,
} from '../functions'

import { CalendarWrapper, TimeWrapper } from './styles'

const MIN = new Date()
MIN.setDate(MIN.getDate() + 1)
MIN.setHours(0, 0, 0, 0)

const Left = () => {
  const { useField, originals } = useFormContext()

  const [events, setEvents] = useField('events')
  const [allDay, setAllDay] = useState(true)
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('23:59')

  const [interval, setInterval] = useState<[Date | null, Date | null]>([
    null,
    null,
  ])

  const onAdd = useCallback(() => {
    if (interval[0] === null) return
    setEvents((prev) => {
      const eventList = prev
      const dates = getRange(interval, 'days')

      for (const date of dates) {
        const start = date.startOf('day').toDate()
        const end = date.endOf('day').toDate()
        if (!allDay) {
          start.setHours(...splitTime(startTime))
          end.setHours(...splitTime(endTime))
        }

        const originalEvent = getEventByDay(start, originals.events)

        eventList.push(
          originalEvent || {
            start: start.toISOString(),
            end: end.toISOString(),
          },
        )
      }

      return sortEvents(eventList)
    })
    setInterval([null, null])
  }, [interval, setEvents, allDay, startTime, endTime, originals.events])

  const valid = useMemo(() => {
    return isValidIntervalTime([null, null], startTime, endTime)
  }, [startTime, endTime])

  const calendarGetDay = (day: Date) => {
    const included = events.filter((event) => {
      const start = moment(event.start).startOf('day')
      const end = moment(event.end).endOf('day')
      return moment(day).isSameOrAfter(start) && moment(day).isSameOrBefore(end)
    })

    if (included.length === 0) return {}

    const appearance = included.some(
      (e) =>
        moment(day).format('YYYY-MM-DD') ===
        moment(e.start).format('YYYY-MM-DD'),
    )
      ? ('disabled' as const)
      : undefined

    const indicator = included.some((e) => isAllDay(e))
      ? ('danger' as const)
      : ('warning' as const)

    return { indicator, appearance }
  }

  return (
    <div>
      <div>Calendário</div>

      <CalendarWrapper>
        <MwCalendar
          type='interval'
          getDay={calendarGetDay}
          value={[interval, setInterval]}
          min={MIN}
        />
      </CalendarWrapper>
      <TimeWrapper>
        <MwInput
          type='checkbox'
          label='Dia Inteiro'
          onChange={(e) => {
            setAllDay(e.target.checked)
            setStartTime('00:00')
            setEndTime('23:59')
          }}
          checked={allDay}
        />

        <MwInput
          type='time'
          value={startTime}
          setValue={setStartTime}
          disabled={allDay || !interval[0]}
          max={endTime}
          invalid={endTime.length === 5 && !valid}
        />

        <MwInput
          type='time'
          value={endTime}
          setValue={setEndTime}
          disabled={allDay || !interval[0]}
          min={startTime}
          invalid={startTime.length === 5 && !valid}
        />

        <MwButton
          type='button'
          onClick={onAdd}
          disabled={interval[0] === null || !valid}
        >
          Adicionar
        </MwButton>
      </TimeWrapper>
    </div>
  )
}

export default Left

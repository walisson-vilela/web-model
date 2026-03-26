import { useMemo, useRef, useState } from 'react'

import { MwCalendar } from '@mw-kit/mw-ui'

import {
  formatSingleDateLabel,
  parseISODate,
} from '../../../../../standardized/utils/date'
import { useOnClickOutState } from '../../../../../utils/hooks'
import { useMainHomeContext } from '../../context'
import * as S from './styles'

const DateFilter = () => {
  const { selectedDate, setSelectedDate } = useMainHomeContext()
  const [open, setOpen] = useState(false)
  const [draftDate, setDraftDate] = useState<Date | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const calendarRef = useOnClickOutState<HTMLDivElement>(() => setOpen(false))

  const label = useMemo(() => {
    const parsed = parseISODate(selectedDate)
    if (!parsed) return formatSingleDateLabel(selectedDate)

    const weekday = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
    }).format(parsed)

    const weekdayLabel = weekday
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('-')

    const dateLabel = formatSingleDateLabel(selectedDate)
    return `Hoje - ${weekdayLabel} ${dateLabel}`
  }, [selectedDate])

  const handleOpen = () => {
    const baseDate = parseISODate(selectedDate)
    setDraftDate(baseDate ?? new Date())
    setOpen(true)
  }

  const handleSubmit = (value: Date | null) => {
    if (value) {
      setSelectedDate(value)
    }
    setOpen(false)
  }

  const resolvedDate = draftDate || parseISODate(selectedDate) || new Date()

  return (
    <S.DateWrapper ref={triggerRef}>
      <S.Trigger type='button' onClick={handleOpen}>
        <S.Value>{label}</S.Value>
        <S.Caret aria-hidden $open={open}>
          <span />
        </S.Caret>
      </S.Trigger>

      {open && (
        <S.CalendarContainer>
          <div ref={calendarRef as never}>
            <MwCalendar
              type='single'
              initialMonth={resolvedDate}
              initialValue={resolvedDate}
              value={[draftDate, setDraftDate]}
              onSubmit={{
                onClick: handleSubmit,
              }}
            />
          </div>
        </S.CalendarContainer>
      )}
    </S.DateWrapper>
  )
}

export default DateFilter

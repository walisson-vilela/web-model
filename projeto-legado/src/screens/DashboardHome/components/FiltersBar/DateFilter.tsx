import { useMemo, useRef, useState } from 'react'

import { MwCalendar } from '@mw-kit/mw-ui'

import { useOnClickOutState } from '../../../../utils/hooks'
import { useDashboardFilters } from '../../filters'
import { formatDashboardDateLabel } from '../../utils/date'
import * as S from './styles'

const DateFilter = () => {
  const { state, setDateFilter } = useDashboardFilters()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const calendarRef = useOnClickOutState<HTMLDivElement>(() => setOpen(false))

  const label = useMemo(() => {
    return formatDashboardDateLabel(state.date)
  }, [state.date])

  return (
    <S.DateWrapper ref={triggerRef}>
      <S.Trigger type='button' onClick={() => setOpen((prev) => !prev)}>
        <span>{label}</span>
        <S.Caret $open={open}>
          <span />
        </S.Caret>
      </S.Trigger>

      {open && (
        <S.CalendarContainer>
          <div ref={calendarRef as never}>
            <MwCalendar
              currentDate={new Date(state.date)}
              onChange={({ start }) => {
                if (!start) return
                setDateFilter(start.toISOString().split('T')[0])
                setOpen(false)
              }}
            />
          </div>
        </S.CalendarContainer>
      )}
    </S.DateWrapper>
  )
}

export default DateFilter

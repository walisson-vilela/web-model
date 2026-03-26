import React, { useMemo, useState } from 'react'

import { Icon, Popup } from 'semantic-ui-react'

import './style.css'

type Props = {
  value: Date
  onChange: (date: Date) => void
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function addDays(date: Date, delta: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + delta)
  return next
}

function startOfCalendarGrid(viewYear: number, viewMonth: number) {
  const first = new Date(viewYear, viewMonth, 1)
  const start = new Date(first)
  start.setDate(1 - first.getDay())
  start.setHours(0, 0, 0, 0)
  return start
}

const DayPicker: React.FC<Props> = (props) => {
  const { value, onChange } = props

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(value.getFullYear())
  const [viewMonth, setViewMonth] = useState(value.getMonth())

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const displayLabel = useMemo(() => {
    return isSameDay(value, today)
      ? 'Hoje'
      : value.toLocaleDateString('pt-BR')
  }, [today, value])

  const monthTitle = useMemo(() => {
    const d = new Date(viewYear, viewMonth, 1)
    const month = d.toLocaleString('en-US', { month: 'long' })
    return `${month} ${viewYear}`
  }, [viewMonth, viewYear])

  const gridStart = useMemo(
    () => startOfCalendarGrid(viewYear, viewMonth),
    [viewMonth, viewYear],
  )

  const days = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i))
  }, [gridStart])

  const changeViewMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  const onOpen = () => {
    setViewYear(value.getFullYear())
    setViewMonth(value.getMonth())
    setOpen(true)
  }

  const onSelectDay = (d: Date) => {
    onChange(new Date(d))
    setOpen(false)
  }

  return (
    <div className='mw-daypicker-root'>
      <div className='mw-daypicker-input'>
        <button
          type='button'
          className='mw-daypicker-arrow'
          onClick={() => onChange(addDays(value, -1))}
        >
          <Icon name='chevron left' />
        </button>

        <button
          type='button'
          className='mw-daypicker-label'
          onClick={() => onChange(today)}
        >
          {displayLabel}
        </button>

        <button
          type='button'
          className='mw-daypicker-arrow'
          onClick={() => onChange(addDays(value, 1))}
        >
          <Icon name='chevron right' />
        </button>

        <Popup
          open={open}
          onOpen={onOpen}
          onClose={() => setOpen(false)}
          on='click'
          position='bottom left'
          className='mw-daypicker-popup'
          trigger={
            <button
              type='button'
              className='mw-daypicker-trigger'
              onClick={() => setOpen((p) => !p)}
            >
              <Icon name='calendar alternate outline' />
            </button>
          }
        >
          <div className='mw-daypicker-calendar'>
            <div className='mw-daypicker-header'>
              <button
                type='button'
                className='mw-daypicker-nav'
                onClick={() => changeViewMonth(-1)}
              >
                <Icon name='chevron left' />
              </button>

              <div className='mw-daypicker-title'>{monthTitle}</div>

              <button
                type='button'
                className='mw-daypicker-nav'
                onClick={() => changeViewMonth(1)}
              >
                <Icon name='chevron right' />
              </button>
            </div>

            <div className='mw-daypicker-weekdays'>
              {WEEKDAYS.map((w) => (
                <div key={w} className='mw-daypicker-weekday'>
                  {w}
                </div>
              ))}
            </div>

            <div className='mw-daypicker-grid'>
              {days.map((d) => {
                const isInMonth = isSameMonth(d, new Date(viewYear, viewMonth, 1))
                const selected = isSameDay(d, value)

                return (
                  <button
                    key={d.toISOString()}
                    type='button'
                    className={
                      'mw-daypicker-cell' +
                      (isInMonth ? '' : ' muted') +
                      (selected ? ' selected' : '')
                    }
                    onClick={() => onSelectDay(d)}
                  >
                    {d.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        </Popup>
      </div>
    </div>
  )
}

export default DayPicker

import React, { useState } from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import './style.css'

interface MonthPickerProps {
  onApply: (month: number, year: number) => void
}

const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
const months_display = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const MonthPicker: React.FC<MonthPickerProps> = ({ onApply }) => {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [year, setYear] = useState<number>(today.getFullYear())
  const [monthIndex, setMonthIndex] = useState<number>(today.getMonth())

  const [tempMonth, setTempMonth] = useState<number>(monthIndex)
  const [tempYear, setTempYear] = useState<number>(year)

  function prevMonth() {
    if (monthIndex === 0) {
      setMonthIndex(11)
      setYear(y => y - 1)
      onApply(11, year - 1)
    } else {
      setMonthIndex(m => {
        const newMonth = m - 1
        onApply(newMonth, year)
        return newMonth
      })
    }
  }

  function nextMonth() {
    if (monthIndex === 11) {
      setMonthIndex(0)
      setYear(y => y + 1)
      onApply(0, year + 1)
    } else {
      setMonthIndex(m => {
        const newMonth = m + 1
        onApply(newMonth, year)
        return newMonth
      })
    }
  }

  function prevYear() {
    setTempYear(y => y - 1)
  }

  function nextYear() {
    setTempYear(y => y + 1)
  }

  function selectMonth(idx: number) {
    setTempMonth(idx)
  }

  function handleApply() {
    setMonthIndex(tempMonth)
    setYear(tempYear)
    onApply(tempMonth, tempYear)
    setOpen(false)
  }

  const displayValue = `${months_display[monthIndex]}/${year}`

  return (
    <div className="mw-monthpicker-root">
      <div className="mw-monthpicker-input">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={prevMonth} className="arrow-btn">
            <Icon name="chevron left" />
          </button>

          <div className="display-box">{displayValue}</div>

          <button onClick={nextMonth} className="arrow-btn">
            <Icon name="chevron right" />
          </button>
        </div>

        <Popup
          open={open}
          onOpen={() => {
            setTempMonth(monthIndex)
            setTempYear(year)
            setOpen(true)
          }}
          onClose={() => setOpen(false)}
          on="click"
          position="bottom left"
          className="mw-popup-fix with-arrow"
          trigger={
            <button
              className="calendar-trigger"
              onClick={() => setOpen(o => !o)}
            >
              <Icon name="calendar alternate outline" />
            </button>
          }
        >
          <div className="mw-popup">
            <div className="mw-popup-header">
              <button onClick={prevYear} className="year-arrow">
                <Icon name="chevron left" />
              </button>
              <div className="year-label">{tempYear}</div>
              <button onClick={nextYear} className="year-arrow">
                <Icon name="chevron right" />
              </button>
            </div>

            <div className="months-grid">
              {MONTHS.map((m, i) => (
                <div
                  key={m}
                  className={`month-cell ${i === tempMonth ? 'selected' : ''}`}
                  onClick={() => selectMonth(i)}
                >
                  {m}
                </div>
              ))}
            </div>

            <div className="apply-row">
              <Button primary size="small" onClick={handleApply}>
                Aplicar
              </Button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  )
}

export default MonthPicker

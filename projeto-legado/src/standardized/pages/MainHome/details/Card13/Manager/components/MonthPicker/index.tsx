import { useMemo, useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import * as S from './styles'

const MONTHS = [
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
  'Dezembro',
]

const formatMonthYear = (date: Date) => {
  const month = MONTHS[date.getMonth()] ?? ''
  const year = date.getFullYear()
  return `${month}/${year}`
}

type MonthPickerProps = {
  value: Date
  onChange: (value: Date) => void
}

const MonthPicker = ({ value, onChange }: MonthPickerProps) => {
  const [open, setOpen] = useState(false)

  const monthsList = useMemo(() => {
    const year = value.getFullYear()
    return MONTHS.map((m, idx) => ({
      id: `${year}-${idx}`,
      label: `${m}/${year}`,
      date: new Date(year, idx, 1),
    }))
  }, [value])

  const goPrev = () => {
    const d = new Date(value)
    d.setMonth(d.getMonth() - 1)
    onChange(d)
  }

  const goNext = () => {
    const d = new Date(value)
    d.setMonth(d.getMonth() + 1)
    onChange(d)
  }

  const trigger = (
    <S.ValueButton type='button' aria-label='Selecionar mês' onClick={() => setOpen((p) => !p)}>
      {formatMonthYear(value)}
      <MwIcon type='feather' icon='chevron_down' width={14} height={14} />
    </S.ValueButton>
  )

  return (
    <S.Control>
      <S.NavButton type='button' aria-label='Mês anterior' onClick={goPrev}>
        <MwIcon type='feather' icon='chevron_left' width={16} height={16} />
      </S.NavButton>

      <Popup
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        trigger={trigger}
        on='click'
        position='bottom center'
        style={{ padding: 0 }}
      >
        <S.PopupContent>
          {monthsList.map((item) => (
            <button
              key={item.id}
              type='button'
              onClick={() => {
                onChange(item.date)
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </S.PopupContent>
      </Popup>

      <S.NavButton type='button' aria-label='Próximo mês' onClick={goNext}>
        <MwIcon type='feather' icon='chevron_right' width={16} height={16} />
      </S.NavButton>
    </S.Control>
  )
}

export default MonthPicker

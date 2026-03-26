import { useMemo } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'

import * as S from '../MonthPicker/styles'

export type PeriodValue = 's0' | 's-1' | 's-2' | 'month'

type PeriodPickerProps = {
  value: PeriodValue
  onChange: (value: PeriodValue) => void
}

const OPTIONS: Array<{ id: PeriodValue; label: string }> = [
  { id: 's0', label: 'S0' },
  { id: 's-1', label: 'S-1' },
  { id: 's-2', label: 'S-2' },
  { id: 'month', label: 'Mês' },
]

const getLabel = (value: PeriodValue) => OPTIONS.find((o) => o.id === value)?.label ?? ''

const PeriodPicker = ({ value, onChange }: PeriodPickerProps) => {
  const activeIndex = useMemo(() => OPTIONS.findIndex((o) => o.id === value), [value])

  const goPrev = () => {
    const idx = activeIndex <= 0 ? OPTIONS.length - 1 : activeIndex - 1
    const nextValue = OPTIONS[idx]?.id ?? value
    onChange(nextValue)
  }

  const goNext = () => {
    const idx = activeIndex >= OPTIONS.length - 1 ? 0 : activeIndex + 1
    const nextValue = OPTIONS[idx]?.id ?? value
    onChange(nextValue)
  }

  return (
    <S.Control>
      <S.NavButton type='button' aria-label='Período anterior' onClick={goPrev}>
        <MwIcon type='feather' icon='chevron_left' width={16} height={16} />
      </S.NavButton>

      <S.ValueButton
        type='button'
        aria-label='Período selecionado'
        style={{
          padding: '0 14px',
          minWidth: 56,
          justifyContent: 'center',
          cursor: 'default',
          fontSize: 14,
        }}
      >
        {getLabel(value)}
      </S.ValueButton>

      <S.NavButton type='button' aria-label='Próximo período' onClick={goNext}>
        <MwIcon type='feather' icon='chevron_right' width={16} height={16} />
      </S.NavButton>
    </S.Control>
  )
}

export default PeriodPicker

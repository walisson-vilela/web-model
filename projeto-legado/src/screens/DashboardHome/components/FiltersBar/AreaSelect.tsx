import { useEffect, useMemo, useRef, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { FILTER_LABELS, useDashboardFilters } from '../../filters'
import * as S from './styles'

const AreaSelect = () => {
  const { state, areas, setAreasFilter } = useDashboardFilters()
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!visible) return
    const id = requestAnimationFrame(() => {
      inputRef.current?.click()
    })
    return () => cancelAnimationFrame(id)
  }, [visible])

  const selectedLabel = useMemo(() => {
    if (state.areasIds.length === 0) return 'Todos'
    if (state.areasIds.length === 1) {
      const area = areas.find((area) => area.id === state.areasIds[0])
      return area?.name ?? '1 selecionada'
    }
    if (state.areasIds.length === 2) {
      const names = state.areasIds
        .map((id) => areas.find((area) => area.id === id)?.name)
        .filter(Boolean)
        .join(', ')
      return names || `${state.areasIds.length} selecionadas`
    }

    return `${state.areasIds.length} selecionadas`
  }, [state.areasIds, areas])

  const options = areas.map((area) => ({
    value: area.id.toString(),
    label: area.name,
    data: area,
  }))

  const openSelect = () => setVisible(true)

  return (
    <S.AreaWrapper>
      <S.Label as='span' onClick={openSelect}>
        {FILTER_LABELS.area}:
      </S.Label>
      <S.AreaDisplay onClick={openSelect}>
        <span>{selectedLabel}</span>
        <S.Caret $open={visible}>
          <span />
        </S.Caret>

        <S.HiddenSelect $visible={visible}>
          <MwInput
            ref={inputRef}
            type='select-multiple'
            placeholder='Selecione'
            selectAll
            loader={async () => options}
            value={state.areasIds.map((id) => id.toString())}
            setValue={(values) => {
              const normalized = values.map((value) => Number(value))
              setAreasFilter(normalized)
              setVisible(false)
            }}
            width='auto'
            inputWidth='auto'
            icon={null}
          />
        </S.HiddenSelect>
      </S.AreaDisplay>
    </S.AreaWrapper>
  )
}

export default AreaSelect

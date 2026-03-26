import { memo } from 'react'

import {
  FILTER_LABELS,
  FILTER_ORDER,
  useDashboardFilters,
} from '../../filters'
import type { FilterKey } from '../../filters'
import AreaSelect from './AreaSelect'
import LevelMenu from './LevelMenu'
import VisionMenu from './VisionMenu'
import DateFilter from './DateFilter'
import MoreOptionsMenu from './MoreOptionsMenu'
import * as S from './styles'

const FiltersBar = () => {
  const { state, options, setFilter } = useDashboardFilters()

  const simpleFilters = FILTER_ORDER.filter(
    (key) => key !== 'vision' && key !== 'level' && key !== 'area',
  ) as FilterKey[]

  return (
    <S.Container>
      <div style={{ display: 'inline-flex', gap: '14px', flexWrap: 'wrap' }}>
        <VisionMenu />
        <LevelMenu />
        <AreaSelect />
        {simpleFilters.map((key) => (
          <FilterSelect
            key={key}
            label={FILTER_LABELS[key]}
            value={state[key]}
            options={options[key]}
            onChange={(value) => setFilter(key, value)}
          />
        ))}
      </div>

      <S.RightFilters>
        <DateFilter />
        <MoreOptionsMenu />
      </S.RightFilters>
    </S.Container>
  )
}

type FilterSelectProps = {
  label: string
  value: string | number
  options: { value: string | number; label: string }[]
  onChange: (value: string | number) => void
}

const FilterSelect = memo(
  ({ label, value, options, onChange }: FilterSelectProps) => {
    const selectId = `dashboard-filter-${label.toLowerCase()}`

    return (
      <S.SelectWrapper>
        <S.Label htmlFor={selectId}>{label}:</S.Label>
        <S.Select
          id={selectId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.Select>
      </S.SelectWrapper>
    )
  },
)

FilterSelect.displayName = 'FilterSelect'

export default FiltersBar

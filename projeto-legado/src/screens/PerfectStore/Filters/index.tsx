import React, { useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import { InputProps } from '@mw-kit/mw-ui/dist/components/Input/components/Input/interfaces'

import { FiltersProps } from './interfaces'
import * as S from './styles'

const Filters = ({ filtersState }: FiltersProps) => {
  const [filters, setFilters] = filtersState

  const [dateInterval, setDateInterval] = useState<[string, string]>(
    (filters.dateInterval as [string, string]) || ['', ''],
  )
  const [status, setStatus] = useState<string[]>(filters.status || [])
  const [registry, setRegistry] = useState<string[]>(filters.registry || [])
  const [team, setTeam] = useState(filters.team || [])
  const [hierarchy, setHierarchy] = useState(filters.hierarchy || [])
  const [segment, setSegment] = useState(filters.segment || [])
  const [market, setMarket] = useState(filters.market || [])
  const [region, setRegion] = useState(filters.region || [])

  const getPlaceholder = (state: string): string => {
    let length = 0

    if ((state = 'status')) length = status.length + registry.length
    else if ((state = 'team')) length = team.length + hierarchy.length
    else if ((state = 'segment')) length = segment.length
    else if ((state = 'market')) length = market.length
    else if ((state = 'region')) length = region.length

    return length > 0 ? `${length} selecionado${length > 1 ? 's' : ''}` : ''
  }

  const applyFilters = () => {
    let filters: { [key: string]: string[] } = {
      dateInterval,
    }

    if (status.length) filters.status = status
    if (registry.length) filters.registry = registry
    if (team.length) filters.team = team
    if (hierarchy.length) filters.hierarchy = hierarchy
    if (segment.length) filters.segment = segment
    if (market.length) filters.market = market
    if (region.length) filters.region = region

    setFilters(filters)
  }

  const getIcon = (onClick: React.MouseEventHandler<HTMLElement>) => {
    const icon: InputProps['icon'] = {
      icon: {
        type: 'semantic',
        icon: 'filter',
        width: 16,
        onClick,
      },
      position: 'right',
    }

    return icon
  }

  return (
    <S.Container>
      <MwInput
        type='date-interval-picker'
        value={dateInterval}
        setValue={setDateInterval}
        label='Período'
        required
      />

      <MwInput
        type='text'
        label='Status | Registros'
        value={getPlaceholder('status')}
        onClick={() => alert('open modal')}
        readOnly
        icon={getIcon(() => alert('open modal tbm'))}
      />

      <MwInput
        type='text'
        label='Equipe | Hierarquia'
        value={getPlaceholder('team')}
        onClick={() => alert('open modal')}
        readOnly
        icon={getIcon(() => alert('open modal tbm'))}
      />

      <MwInput
        type='text'
        label='Canal'
        value={getPlaceholder('segment')}
        onClick={() => alert('open modal')}
        readOnly
        icon={getIcon(() => alert('open modal tbm'))}
      />

      <MwInput
        type='text'
        label='Mercado'
        value={getPlaceholder('market')}
        onClick={() => alert('open modal')}
        readOnly
        icon={getIcon(() => alert('open modal tbm'))}
      />

      <MwInput
        type='text'
        label='Região'
        value={getPlaceholder('region')}
        onClick={() => alert('open modal')}
        readOnly
        icon={getIcon(() => alert('open modal tbm'))}
      />

      <MwButton content='Aplicar' onClick={() => applyFilters()} />
    </S.Container>
  )
}

export default Filters

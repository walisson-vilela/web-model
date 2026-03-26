import React, { useEffect, useMemo, useState } from 'react'

import { FiltersInterfaces, Toolbar } from '@mw-kit/mw-manager'

import { DistributionSignature } from '../../../../../interfaces'
import { profiles as profileOptions } from '../../../../../../../services/options'
import * as S from './styles'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Perfil',
    name: 'profile_id',
    options: profileOptions,
    allowEmptySearch: true,
  },
]

type SignatureListProps = {
  signatures: DistributionSignature[]
  loading?: boolean
  renderItem: (data: DistributionSignature) => React.ReactNode
  onProfileFilterChange?: (profileId?: string | number) => void
}

const SignatureList = ({
  signatures,
  loading = false,
  renderItem,
  onProfileFilterChange,
}: SignatureListProps) => {
  const [search, setSearch] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])

  const filteredItems = useMemo(() => {
    if (!search.trim()) return signatures
    return signatures.filter((item) => {
      const term = search.toLowerCase()
      return (
        item.signer.name.toLowerCase().includes(term) ||
        item.signer.registry.toLowerCase().includes(term)
      )
    })
  }, [signatures, search])

  useEffect(() => {
    if (!onProfileFilterChange) return
    const profileFilter = appliedFilters.find(
      (filter) => filter.name === 'profile_id',
    )
    const value = profileFilter?.value
    const normalized = Array.isArray(value) ? value[0] : value
    onProfileFilterChange(normalized)
  }, [appliedFilters, onProfileFilterChange])

  return (
    <S.Container>
      <S.ToolbarWrapper>
        <Toolbar
          filters={{ filters, appliedFilters, setAppliedFilters }}
          search={{ search, setSearch }}
          except={{
            paginator: true,
            calendar: true,
            calendarInterval: true,
            reloader: true,
          }}
        />
      </S.ToolbarWrapper>

      {loading ? (
        <S.EmptyState>Carregando assinaturas...</S.EmptyState>
      ) : filteredItems.length === 0 ? (
        <S.EmptyState>Nenhuma assinatura encontrada.</S.EmptyState>
      ) : (
        <S.List>
          {filteredItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {renderItem(item)}
              {index < filteredItems.length - 1 && <S.Separator />}
            </React.Fragment>
          ))}
        </S.List>
      )}
    </S.Container>
  )
}

export default SignatureList

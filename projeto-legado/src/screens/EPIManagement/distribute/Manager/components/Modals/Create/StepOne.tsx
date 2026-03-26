import type { AppliedFilter, Filter } from '@mw-kit/mw-ui/types'
import React, { useEffect, useMemo, useState } from 'react'

import GridSelector from '../../../../../../../components/GridSelector'
import { Rows } from '../../../../../../../components/GridSelector/interfaces'

interface StepOneProps {
  epiRows: Rows<{ id: number; name: string }>
  checkedEpis: [{ id: number; name: string }[], React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>]
  collabRows: Rows<{ id: number; name: string; role: string; area?: string }>
  checkedCollabs: [{ id: number; name: string; role: string; area?: string }[], React.Dispatch<React.SetStateAction<{ id: number; name: string; role: string; area?: string }[]>>]
  collabAppliedFilters: [AppliedFilter[], React.Dispatch<React.SetStateAction<AppliedFilter[]>>]
  collabFiltersItems: Filter[]
  episSearch: string
  setEpisSearch: React.Dispatch<React.SetStateAction<string>>
  collabSearch: string
  setCollabSearch: React.Dispatch<React.SetStateAction<string>>
  onApplyHierarchyPeople?: (payload: any) => void
  perfilFiltro: string | number
  setPerfilFiltro: React.Dispatch<React.SetStateAction<string | number>>
}

const StepOne: React.FC<StepOneProps> = ({
  epiRows,
  checkedEpis,
  collabRows,
  checkedCollabs,
  collabAppliedFilters,
  collabFiltersItems,
  episSearch,
  setEpisSearch,
  collabSearch,
  setCollabSearch,
  perfilFiltro: _perfilFiltro,
  setPerfilFiltro,
}) => {
  const PAGE_SIZE = 20
  const [collabPage, setCollabPage] = useState(1)

  const [appliedFilters, setAppliedFilters] = collabAppliedFilters

  // resetar página ao alterar busca ou reduzir lista
  useEffect(() => {
    setCollabPage(1)
  }, [collabSearch, collabRows.length])

  useEffect(() => {
    const profileFilter = appliedFilters.find(
      (filter) => filter.name === 'profile_id',
    )
    const rawValue = profileFilter?.value
    const resolvedValue = Array.isArray(rawValue)
      ? rawValue[0]
      : rawValue ?? ''
    setPerfilFiltro(resolvedValue || '')
  }, [appliedFilters, setPerfilFiltro])

  const paginatedCollabRows = useMemo(
    () => collabRows.slice(0, collabPage * PAGE_SIZE),
    [collabRows, collabPage],
  )

  const collabLastPage = collabPage * PAGE_SIZE >= collabRows.length

  const collabRowsWithRole = useMemo(
    () =>
      paginatedCollabRows.map((row) => ({
        ...row,
        content: ({ data }: { data: { id: number; name: string; role: string } }) => (
          <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>
              {data.id} - {data.name}
            </span>
            <span style={{ marginLeft: 8 }}>{data.role}</span>
          </span>
        ),
      })),
    [paginatedCollabRows],
  )


  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 12px' }}>EPI's</h4>
        <GridSelector
          rows={epiRows}
          checked={checkedEpis}
          toolbar={{
            checkAll: true,
            search: { submitted: [episSearch, setEpisSearch] },
            preserveCheckedOnSearch: true,
          }}
          scrollHeight='340px'
        />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 12px' }}>Colaboradores</h4>

        <GridSelector
          rows={collabRowsWithRole}
          checked={checkedCollabs}
          toolbar={{
            checkAll: true,
            search: { submitted: [collabSearch, setCollabSearch] },
            filters: {
              items: collabFiltersItems,
              setAppliedFilters,
              containerProps: {
                position: 'right bottom',
              },
            },
            appliedFilters: {
              appliedFilters: [appliedFilters, setAppliedFilters],
              containerProps: {
                position: 'right bottom',
              },
            },
            preserveCheckedOnSearch: true,
          }}
          pagination={{ lastPage: collabLastPage, page: [collabPage, setCollabPage] }}
          scrollHeight='340px'
        />
      </div>
    </div>
  )
}

export default StepOne

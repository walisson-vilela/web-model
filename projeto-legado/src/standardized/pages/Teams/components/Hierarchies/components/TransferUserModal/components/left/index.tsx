import React, { useCallback, useEffect, useMemo, useState } from 'react'

import type { AppliedFilter } from '@mw-kit/mw-ui/types'

import type {
  Rows,
  TUseContent,
} from '../../../../../../../../../components/GridSelector/interfaces'
import { getNodesByParentId } from '../../../../../../services'
import useTransferUsersContext from '../../context'
import { identify } from '../../functions'
import type { HierarchyUser } from '../../types'
import Row from '../Row'

import getFilters from './filters'

const useLeft: TUseContent<HierarchyUser> = () => {
  const {
    users: [checked, setChecked],
    nodeDatum,
    hierarchy,
  } = useTransferUsersContext()

  const { attributes } = nodeDatum

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<HierarchyUser>>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getNodesByParentId({
        search,
        parent_id: attributes.id as number,
        hierarchy_id: hierarchy.id,
        appliedFilters,
        page,
      })

      const loadedRows = response.data.reduce<Rows<HierarchyUser>>(
        (rows, data) => {
          if (!data.hierarchies_user) return rows

          const row: Rows<HierarchyUser>[number] = {
            data: data.hierarchies_user,
            content: Row,
          }
          rows.push(row)
          return rows
        },
        [],
      )

      setRows(page === 1 ? loadedRows : (prev) => [...prev, ...loadedRows])
      setLastPage(!response.pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [hierarchy.id, search, attributes.id, appliedFilters, page])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  const gridTitle = () => {
    return (
      <React.Fragment>
        <span>Responsável Direto Atual: </span>
        <b>{nodeDatum.name}</b> | <span>Nível: </span>
        <b>{attributes.structure.name || attributes.structure.level_label}</b>
      </React.Fragment>
    )
  }

  const filters = useMemo(() => getFilters(hierarchy.id), [hierarchy.id])

  return {
    title: gridTitle(),
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum Usuário encontrado para a busca realizada'
          : 'Nenhum Usuário encontrado',
      },
      toolbar: {
        checkAll: true,
        search: {
          submitted: [search, setSearch],
          collapse: true,
        },
        filters: { ...filters, setAppliedFilters },
        appliedFilters: { appliedFilters: [appliedFilters, setAppliedFilters] },
      },
      pagination: {
        page: [page, setPage],
        lastPage,
      },
    },
  }
}

export default useLeft

import { useCallback, useEffect, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../components/GridSelector/interfaces'
import { HierarchyUser } from '../../../../../../types'
import useMirroringModalContext from '../../context'
import Row from '../Row'
import { identify } from '../functions'

import filters from './filters'
import { getOptions } from './service'

const useLeft: TUseContentSelected<HierarchyUser> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<HierarchyUser>>([])
  const [checked, setChecked] = useState<HierarchyUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const { hierarchyId, hierarchiesUser } = useMirroringModalContext()

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data: response, pagination } = await getOptions(
        search,
        appliedFilters,
        page,
        hierarchyId,
      )

      const newRows: Rows<HierarchyUser> = response.map((data) => {
        const isChecked = selected.some((value) => identify(value, data))
        return {
          data,
          content: Row,
          checked: isChecked,
          disabled: isChecked,
        }
      })

      setRows((prev) => (page === 1 ? newRows : [...prev, ...newRows]))
      setLastPage(!pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [
    search,
    appliedFilters,
    selected,
    page,
    hierarchyId,
    hierarchiesUser.user.id,
  ])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleAdd = () => {
    setSelected((prev) => {
      const map = new Map<string, HierarchyUser>()

      prev.forEach((u) => map.set(String(u.user.id), u))
      checked.forEach((u) => map.set(String(u.user.id), u))

      return Array.from(map.values())
    })
    setChecked([])
  }

  return {
    title: <b>Lista de Usuários com atributos internos</b>,
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty:
          search.length > 0 || appliedFilters.length > 0
            ? 'Nenhum usuário encontrado para a busca realizada'
            : 'Use o campo de busca acima para pesquisar usuários',
      },
      toolbar: {
        checkAll: true,
        search: {
          submitted: [search, setSearch],
          collapse: true,
        },
        filters: {
          ...filters,
          setAppliedFilters,
        },
        appliedFilters: {
          appliedFilters: [appliedFilters, setAppliedFilters],
        },
      },
      pagination: {
        page: [page, setPage],
        lastPage,
      },
    },
    button: {
      type: 'button',
      onClick: handleAdd,
      content: 'Adicionar',
      disabled: checked.length === 0,
      size: 'small',
    },
  }
}

export default useLeft

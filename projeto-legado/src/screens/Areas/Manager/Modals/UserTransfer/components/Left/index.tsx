import { useCallback, useEffect, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import {
  Rows,
  TUseContent,
} from '../../../../../../../components/GridSelector/interfaces'
import useContext from '../../context'
import { User } from '../../interfaces'

import Row from './components/Row'
import filters from './filters'
import { getUsers } from './service'

const useLeft: TUseContent<User> = () => {
  const {
    left: [checked, setChecked],
    data,
  } = useContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<User>>([])

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const { data: users, pagination } = await getUsers(
        search,
        data.id,
        appliedFilters,
        page,
      )
      const rows = users.map((data): Rows<User>[number] => {
        const row: Rows<User>[number] = {
          data,
          content: Row,
        }
        return row
      })

      setRows(page === 1 ? rows : (prev) => [...prev, ...rows])
      setLastPage(!pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, data.id, appliedFilters, page])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: <>Área atual: {data.name}</>,
    gridSelector: {
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

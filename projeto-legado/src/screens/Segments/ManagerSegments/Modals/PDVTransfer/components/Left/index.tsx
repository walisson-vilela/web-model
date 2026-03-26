import { useCallback, useContext, useEffect, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import {
  Rows,
  TUseContent,
} from '../../../../../../../components/GridSelector/interfaces'
import Context from '../../context'
import { Store } from '../../interfaces'
import { getSegmentStores } from '../../services'

import Row from './components/Row'
import filters from './filters'

const useLeft: TUseContent<Store> = () => {
  const { selectedStore, setSelectedStore, item } = useContext(Context)

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<Store>>([])
  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const {
        data,
        pagination: { has_next_page },
      } = await getSegmentStores(item.id, search, page, appliedFilters)

      setIsLastPage(has_next_page)

      const loadedRows = data.map((data): Rows<Store>[number] => {
        const row: Rows<Store>[number] = {
          data,
          content: Row,
        }
        return row
      })

      setRows(page === 1 ? loadedRows : (prev) => [...prev, ...loadedRows])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, item.id, item.default_id, page, appliedFilters])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: (
      <>
        Canal Atual: <strong>{item.name}</strong>
      </>
    ),
    gridSelector: {
      type: 'checkbox',
      rows,
      checked: [selectedStore, setSelectedStore],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum PDV encontrado para a busca realizada'
          : 'Nenhum PDV encontrado',
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
      pagination: { lastPage: isLastPage, page: [page, setPage] },
    },
  }
}

export default useLeft

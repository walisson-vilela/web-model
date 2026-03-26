import { useCallback, useEffect, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import {
  Rows,
  TUseContent,
} from '../../../../../../../components/GridSelector/interfaces'
import useContext from '../../context'
import { Product } from '../../interfaces'

import Row from './components/Row'
import filters from './filters'
import { getProducts } from './service'

const useLeft: TUseContent<Product> = () => {
  const {
    left: [checked, setChecked],
    data,
  } = useContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<Product>>([])

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const { data: products, pagination } = await getProducts(
        search,
        data.id,
        appliedFilters,
        page,
      )
      const rows = products.map((data): Rows<Product>[number] => {
        const row: Rows<Product>[number] = {
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
    title: (
      <>
        Marca Atual: <b>{data.name}</b> | Tipo da Marca:{' '}
        <b>{data.type_label}</b>
      </>
    ),
    gridSelector: {
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum Produto encontrado para a busca realizada'
          : 'Nenhum Produto encontrado',
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

import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContent,
} from '../../../../../../../components/GridSelector/interfaces'
import useContext from '../../context'
import { Brand } from '../../interfaces'

import { getBrands } from './service'

const useRight: TUseContent<Brand> = () => {
  const {
    right: [checked, setChecked],
    data,
  } = useContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<Brand>>([])

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const { data: brands, pagination } = await getBrands(
        search,
        page,
        data.id,
        data.type,
      )
      const rows = brands.map((data): Rows<Brand>[number] => {
        const row: Rows<Brand>[number] = {
          data,
          content: data.name,
        }

        return row
      })

      setRows(rows)
      setLastPage(!pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, page, data.id])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: `Transferir Produtos selecionados para outra Marca (${data.type_label}):`,
    gridSelector: {
      rows,
      type: 'radio',
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhuma Marca encontrada na busca realizada'
          : 'Nenhuma Marca encontrada',
      },
      toolbar: {
        checkAll: true,
        search: {
          submitted: [search, setSearch],
        },
      },
      pagination: {
        page: [page, setPage],
        lastPage,
      },
    },
  }
}

export default useRight

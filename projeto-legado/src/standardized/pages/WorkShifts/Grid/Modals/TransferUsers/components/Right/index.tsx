import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContent,
} from '../../../../../../../../components/GridSelector/interfaces'
import { getWorkShifts } from '../../../../../services/list'
import useContext from '../../context'
import { WorkShift } from '../../interfaces'

import { Row } from './components'

const useRight: TUseContent<WorkShift> = () => {
  const {
    right: [checked, setChecked],
    data,

    left: [left],
  } = useContext()

  const [search, setSearch] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<WorkShift>>([])

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const onLoadRows = useCallback(async () => {
    setLoading(true)

    try {
      const {
        data: results,
        pagination: { has_next_page, page: currentPage },
      } = await getWorkShifts({ search, page })

      const rows = results
        .filter((result) => result.id !== data.id)
        .map((workshift): Rows<WorkShift>[number] => {
          const disabled =
            workshift.electronic_point === true &&
            left.some((user) => user.person.pis === null)

          const row: Rows<WorkShift>[number] = {
            data: workshift,
            content: Row,
            disabled,
          }

          return row
        })

      setRows(page === 1 ? rows : (prev) => [...prev, ...rows])
      setPage(currentPage)
      setLastPage(!has_next_page)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [search, data.id, page, left.length])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: <b>Transferir Usuários selecionados para:</b>,
    gridSelector: {
      rows,
      type: 'radio',
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhuma Função encontrada na busca realizada'
          : 'Nenhuma Função encontrada',
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

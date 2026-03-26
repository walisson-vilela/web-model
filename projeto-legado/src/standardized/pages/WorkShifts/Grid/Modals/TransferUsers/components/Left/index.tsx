import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContent,
} from '../../../../../../../../components/GridSelector/interfaces'
import useContext from '../../context'
import { User } from '../../interfaces'

import Row from './components/Row'
import { getUsers } from './service'

const useLeft: TUseContent<User> = () => {
  const {
    left: [checked, setChecked],
    data,
    right: [right],
  } = useContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<User>>([])

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const { data: users, pagination } = await getUsers(data.id, search, page)

      const rows = users.map((data): Rows<User>[number] => {
        const disabled =
          !!right && right.electronic_point === true && data.person.pis === null

        const row: Rows<User>[number] = {
          data,
          content: Row,
          disabled,
        }
        return row
      })

      setRows(page === 1 ? rows : (prev) => [...prev, ...rows])
      setPage(pagination.page)
      setLastPage(!pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, data.id, page, right])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: <b>Lista de Usuários</b>,

    gridSelector: {
      type: 'checkbox',
      rows,
      checked: [
        checked,
        (value) => {
          setChecked(value)
        },
      ],
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
        },
      },
      pagination: {
        page: [page, setPage],
        lastPage,
      },
    },
  }
}

export default useLeft

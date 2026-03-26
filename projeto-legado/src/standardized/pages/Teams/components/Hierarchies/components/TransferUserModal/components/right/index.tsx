import { useCallback, useEffect, useState } from 'react'

import type {
  Rows,
  TUseContent,
} from '../../../../../../../../../components/GridSelector/interfaces'
import useTransferUsersContext from '../../context'
import { identify } from '../../functions'
import type { HierarchyUser } from '../../types'
import Row from '../Row'

import { getSuperiors } from './services'

const useRight: TUseContent<HierarchyUser> = () => {
  const {
    superior: [superior, setSuperior],
    users: [checked],
    nodeDatum: { attributes },
    hierarchy,
  } = useTransferUsersContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<HierarchyUser>>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const onLoadRows = useCallback(async () => {
    if (checked.length < 1) return

    setLoading(true)
    try {
      const response = await getSuperiors(
        hierarchy.id,
        attributes.structure.level + 1,
        checked.map((e) => e.user.id),
        search,
        page,
        attributes.hierarchies_user?.user.id,
      )

      const loadedRows = response.data.reduce<Rows<HierarchyUser>>(
        (rows, data) => {
          const row: Rows<HierarchyUser>[number] = {
            data,
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
  }, [
    hierarchy.id,
    search,
    checked,
    page,
    attributes.structure.level,
    attributes.hierarchies_user?.user.id,
  ])

  useEffect(() => {
    const timeoutId = setTimeout(onLoadRows, 500)
    return () => clearTimeout(timeoutId)
  }, [onLoadRows])

  return {
    title: 'Transferir para:',
    gridSelector: {
      identify,
      type: 'radio',
      rows,
      checked: [superior, setSuperior],
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

export default useRight

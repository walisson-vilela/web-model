import { useCallback, useEffect, useState } from 'react'

import GridSelector from '../../../../../../../../../components/GridSelector'
import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../components/GridSelector/interfaces'
import useManageAreaContext from '../../../../context'
import { identify } from '../../../../functions'
import { Segments } from '../../../../interface'
import Row from '../Row'

import { getOptions } from './service'

const useLeft: TUseContentSelected<Segments> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<Segments>>([])
  const [checked, setChecked] = useState<Segments[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState<boolean>(true)

  const {
    loading: loadingContext,
    rule: [rule, setRule],
  } = useManageAreaContext()

  const loadData = useCallback(async () => {
    if (loadingContext) return
    setLoading(true)
    try {
      const { data: response, pagination } = await getOptions(search, page)
      const rows = response.map((data): Rows<Segments>[number] => {
        const checked = selected.some((value) => identify(value, data))

        const row: Rows<Segments>[number] = {
          data,
          content: Row,
          checked,
          disabled: checked,
        }
        return row
      })
      setRows(page === 1 ? rows : (prev) => [...prev, ...rows])
      setLastPage(!pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, selected, loadingContext, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  const Submit = () => {
    setSelected((prev) => {
      const newState = [...prev, ...checked].reduce((prev, e) => {
        return { ...prev, [e.foreign_id]: e }
      }, {} as { [key: Segments['foreign_id']]: Segments })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  return {
    title: <b>Relação de Canal</b>,
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum Canal encontrado para a busca realizada'
          : 'Nenhum Canal encontrado',
      },
      toolbar: {
        checkAll: true,
        search: {
          submitted: [search, setSearch],
        },
      },
      pagination: { page: [page, setPage], lastPage },
    },
    button: {
      type: 'button',
      onClick: Submit,
      content: 'Adicionar',
      disabled: checked.length === 0 || !rule,
      size: 'small',
    },
    footer: (
      <GridSelector.ActionType
        rule={[rule, setRule]}
        count={selected.length}
        label='Canais'
      />
    ),
  }
}

export default useLeft

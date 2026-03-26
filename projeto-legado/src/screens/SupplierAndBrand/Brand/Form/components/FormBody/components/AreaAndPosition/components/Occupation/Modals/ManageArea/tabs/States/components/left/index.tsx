import { useCallback, useEffect, useState } from 'react'

import GridSelector from '../../../../../../../../../../../../../../../../components/GridSelector'
import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../../../../../../../../components/GridSelector/interfaces'
import useManageAreaContext from '../../../../context'
import { identify } from '../../../../functions'
import { State } from '../../../../interface'
import Row from '../Row'

import { getOptions } from './service'

const useLeft: TUseContentSelected<State> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<State>>([])
  const [checked, setChecked] = useState<State[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const {
    rule: [rule, setRule],
  } = useManageAreaContext()

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const { data: response, pagination } = await getOptions(search, page)
      const rows = response.map((data): Rows<State>[number] => {
        const checked = selected.some((value) => identify(value, data))

        const row: Rows<State>[number] = {
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
  }, [search, selected, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  const Submit = () => {
    setSelected((prev) => {
      const newState = [...prev, ...checked].reduce((prev, e) => {
        return { ...prev, [e.foreign_id]: e }
      }, {} as { [key: State['foreign_id']]: State })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  return {
    title: <b>Relação de Estados</b>,
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum Estado encontrado para a busca realizada'
          : 'Nenhum Estado encontrado',
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
        label='Estados'
      />
    ),
  }
}

export default useLeft

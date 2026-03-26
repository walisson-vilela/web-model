import { useCallback, useEffect, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import GridSelector from '../../../../../../../../../../../../../../../components/GridSelector'
import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../../../../../../../components/GridSelector/interfaces'
import { identify } from '../../../../functions'
import { Flags } from '../../../../interface'
import useManageAreaContext from '../../../context'
import Row from '../Row'

import filters from './filters'
import { getOptions } from './service'

const useLeft: TUseContentSelected<Flags> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<Flags>>([])
  const [checked, setChecked] = useState<Flags[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState<boolean>(true)
  const {
    rule: [rule, setRule],
  } = useManageAreaContext()

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const { data: response, pagination } = await getOptions(
        search,
        appliedFilters,
        page,
      )
      const rows = response.map((data): Rows<Flags>[number] => {
        const checked = selected.some((value) => identify(value, data))

        const row: Rows<Flags>[number] = {
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
  }, [search, appliedFilters, selected, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  const Submit = () => {
    setSelected((prev) => {
      const newState = [...prev, ...checked].reduce((prev, e) => {
        return { ...prev, [e.foreign_id]: e }
      }, {} as { [key: Flags['foreign_id']]: Flags })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  return {
    title: <b>Relação de Bandeira</b>,
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhuma Bandeira encontrado para a busca realizada'
          : 'Nenhuma Bandeira encontrado',
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
      onClick: Submit,
      content: 'Adicionar',
      disabled: checked.length === 0 || !rule,
      size: 'small',
    },
    footer: (
      <GridSelector.ActionType
        rule={[rule, setRule]}
        count={selected.length}
        label='Bandeiras'
      />
    ),
  }
}

export default useLeft

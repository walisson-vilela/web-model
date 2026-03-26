import { useCallback, useEffect, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import GridSelector from '../../../../../../../../../../../../../../../../components/GridSelector'
import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../../../../../../../../components/GridSelector/interfaces'
import useManageAreaContext from '../../../../context'
import { identify } from '../../../../functions'
import { City } from '../../../../interface'
import Row from '../Row'

import filters from './filters'
import { getOptions } from './service'

const useLeft: TUseContentSelected<City> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<City>>([])
  const [checked, setChecked] = useState<City[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const {
    rule: [rule, setRule],
  } = useManageAreaContext()

  const loadData = useCallback(async () => {
    setLoading(true)

    if (search.length === 0 && appliedFilters.length === 0 && page === 1) {
      setRows([])
      setLastPage(true)
      setLoading(false)
      return
    }

    try {
      const { data: response, pagination } = await getOptions(
        search,
        appliedFilters,
        page,
      )
      const rows = response.map((data): Rows<City>[number] => {
        const checked = selected.some((value) => identify(value, data))

        const row: Rows<City>[number] = {
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
      }, {} as { [key: City['foreign_id']]: City })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  return {
    title: <b>Relação de Cidades</b>,
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty:
          search.length > 0 || appliedFilters.length > 0
            ? 'Nenhuma Cidade encontrada para a busca realizada'
            : 'Utilize o campo de busca acima para pesquisar por Cidades',
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
        label='Cidades'
      />
    ),
  }
}

export default useLeft

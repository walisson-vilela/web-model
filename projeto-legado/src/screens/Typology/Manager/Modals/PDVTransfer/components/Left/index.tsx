import { useCallback, useEffect, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import {
  Rows,
  TUseContent,
} from '../../../../../../../components/GridSelector/interfaces'
import useContext from '../../context'
import { PDV } from '../../interfaces'

import Row from './components/Row'
import filters from './filters'
import { getPDVs } from './service'
import * as S from './styled'

const useLeft: TUseContent<PDV> = () => {
  const {
    left: [checked, setChecked],
    typology,
  } = useContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<PDV>>([])

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const buildFilterParams = (filters: AppliedFilter[]) => {
    const params: { [key: string]: string | number | boolean } = {}
    filters.forEach((filter) => {
      if (filter.value) {
        params[filter.name] = filter.value
      }
    })
    return params
  }

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const filterParams = buildFilterParams(appliedFilters)
      const associatedGroup = await getPDVs(
        search,
        typology.id,
        typology.default_id,
        filterParams,
      )

      const loadedRows = associatedGroup.map((data): Rows<PDV>[number] => {
        const row: Rows<PDV>[number] = {
          data,
          content: Row,
        }
        return row
      })

      setRows(loadedRows)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, typology.id, typology.default_id, appliedFilters])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows, appliedFilters, search])

  return {
    title: <S.Title>Tipologia atual: {typology.name}</S.Title>,
    gridSelector: {
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
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
    },
  }
}

export default useLeft

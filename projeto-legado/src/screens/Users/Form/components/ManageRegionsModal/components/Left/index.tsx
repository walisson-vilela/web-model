import React, { useCallback, useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { AppliedFilter } from '@mw-kit/mw-ui/types'

import GridSelector from '../../../../../../../components/GridSelector'
import {
  IdentifyFunc,
  Rows,
} from '../../../../../../../components/GridSelector/interfaces'
import { Region } from '../../interfaces'

import getFilters from './filters'
import { getRegions } from './services'

const identify: IdentifyFunc<Region> = (x, y) => x.region_id === y.region_id

const Left = (props: {
  selected: [Region[], React.Dispatch<React.SetStateAction<Region[]>>]
  hierarchy_id: number
}) => {
  const {
    selected: [selected, setSelected],
    hierarchy_id,
  } = props

  const [rows, setRows] = useState<Rows<Region>>([])
  const [checked, setChecked] = useState<Region[]>([])

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = await getRegions(
        search,
        page,
        hierarchy_id,
        appliedFilters,
      )

      // setando se a pagina atual e a ultima
      setLastPage(response.lastPage)

      const parsed = response.data.map<Rows<Region>[number]>((data) => {
        const checked = selected.some((e) => identify(e, data))
        return {
          data,
          checked,
          disabled: checked,
          content: data.name,
        }
      })

      setRows(page === 1 ? parsed : (prev) => prev.concat(parsed))
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [selected, hierarchy_id, page, search, appliedFilters])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        return { ...prev, [e.region_id]: e }
      }, {} as { [key: Region['region_id']]: Region })

      checked.forEach((e) => {
        newState[e.region_id] = e
      })

      return Object.keys(newState).map((k) => newState[k])
    })
    setPage(1)
    setChecked([])
  }

  const filters = getFilters(hierarchy_id)

  return (
    <React.Fragment>
      <div>
        <b children='Relação das Áreas' />
      </div>

      <div>
        <GridSelector
          {...{
            rows,
            checked: [checked, setChecked],
            loading,
            identify,
            messages: {
              empty:
                appliedFilters.length || search.length
                  ? 'Nenhuma Área encontrada para a busca realizada'
                  : 'Nenhuma Área encontrada',
            },
            pagination: {
              page: [page, setPage],
              lastPage,
            },
            toolbar: {
              checkAll: true,
              search: {
                collapse: true,
                submitted: [search, setSearch],
              },
              filters: {
                items: filters,
                setAppliedFilters,
                containerProps: {
                  position: 'right bottom',
                },
              },
              appliedFilters: {
                appliedFilters: [appliedFilters, setAppliedFilters],
                containerProps: {
                  position: 'right bottom',
                },
              },
            },
          }}
        />
      </div>

      <div>
        <MwButton
          type='button'
          onClick={onSubmit}
          content='Adicionar'
          disabled={checked.length === 0}
        />
      </div>
    </React.Fragment>
  )
}

export default Left

import React, { useCallback, useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../../../components/GridSelector'
import {
  IdentifyFunc,
  Rows,
} from '../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../utils/Validators'
import { Region } from '../../interfaces'

const identify: IdentifyFunc<Region> = (x, y) => x.region_id === y.region_id

const Right = (props: {
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

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const parsed = selected.reduce<Rows<Region>>((parsed, e) => {
        if (!strCmp(e.name, search, { contain: true })) return parsed

        return [
          ...parsed,
          {
            data: e,
            content: e.name,
          },
        ]
      }, [])

      setRows([...parsed])
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [selected, hierarchy_id, search])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        return { ...prev, [e.region_id]: e }
      }, {} as { [key: Region['region_id']]: Region })

      checked.forEach((e) => {
        delete newState[e.region_id]
      })

      return Object.keys(newState).map((k) => newState[k])
    })
    setChecked([])
  }

  return (
    <React.Fragment>
      <div>
        <b children='Áreas Associadas' />
      </div>

      <div>
        <GridSelector
          {...{
            rows,
            checked: [checked, setChecked],
            identify,
            loading,
            messages: {
              empty: search.length
                ? 'Nenhuma Área encontrada para a busca realizada'
                : 'Nenhuma Área encontrada',
            },
            toolbar: {
              checkAll: true,
              search: {
                submitted: [search, setSearch],
              },
            },
          }}
        />
      </div>

      <div>
        <MwButton
          type='button'
          onClick={onSubmit}
          content='Remover'
          color='red'
          disabled={checked.length === 0}
        />
      </div>
    </React.Fragment>
  )
}

export default Right

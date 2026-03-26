import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../components/GridSelector/interfaces'
import useManageGroupingContext from '../../context'
import { identify } from '../../functions'
import { Selected } from '../../interface'
import Row from '../Row'

import { getOptions } from './service'

const useLeft: TUseContentSelected<Selected[number]> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<Selected[number]>>([])
  const [checked, setChecked] = useState<Selected[number][]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  const { loading: loadingContext, data } = useManageGroupingContext()

  const loadData = useCallback(async () => {
    if (loadingContext) return
    setLoading(true)
    try {
      const response = await getOptions(search, data.hierarchy_id)
      setRows(
        response.map((data): Rows<Selected[number]>[number] => {
          const checked = selected.some((value) => identify(value, data))

          const row: Rows<Selected[number]>[number] = {
            data,
            content: Row,
            checked,
            disabled: checked,
          }
          return row
        }),
      )

      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }, [data.hierarchy_id, search, selected, loadingContext])

  useEffect(() => {
    loadData()
  }, [loadData])

  const Submit = () => {
    setSelected((prev) => {
      const newState = [...prev, ...checked].reduce((prev, e) => {
        return { ...prev, [e.foreign_id]: e }
      }, {} as { [key: Selected[number]['foreign_id']]: Selected[number] })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  return {
    title: <b>Relação de Áreas</b>,
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
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
    },
    button: {
      type: 'button',
      onClick: Submit,
      content: 'Adicionar',
      disabled: checked.length === 0,
      size: 'small',
    },
  }
}

export default useLeft

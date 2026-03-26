import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../utils/Validators'
import useManageGroupingContext from '../../context'
import { identify } from '../../functions'
import { Selected } from '../../interface'
import Row from '../Row'

const useRight: TUseContentSelected<Selected[number]> = ({
  selected: [selected, setSelected],
}) => {
  const [search, setSearch] = useState<string>('')

  const [rows, setRows] = useState<Rows<Selected[number]>>([])
  const [checked, setChecked] = useState<Selected[number][]>([])

  const { loading } = useManageGroupingContext()

  const initializeRows = useCallback(() => {
    const initialRows = selected.reduce<Rows<Selected[number]>>(
      (rows, data) => {
        if (
          ![data.name].some((e) => strCmp(e || '', search, { contain: true }))
        ) {
          return rows
        }

        const row: Rows<Selected[number]>[number] = {
          data,
          content: Row,
        }
        return [...rows, row]
      },
      [],
    )
    setRows(initialRows)
  }, [selected, search])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        return { ...prev, [e.foreign_id]: e }
      }, {} as { [key: Selected[number]['foreign_id']]: Selected[number] })

      checked.forEach((e) => {
        delete newState[e.foreign_id]
      })

      return Object.keys(newState).map((k) => newState[k])
    })
    setChecked([])
  }

  useEffect(() => {
    initializeRows()
  }, [initializeRows])

  return {
    title: <b>Áreas Associadas</b>,
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
      onClick: onSubmit,
      content: 'Remover',
      color: 'red',
      disabled: checked.length === 0,
      size: 'small',
    },
  }
}

export default useRight

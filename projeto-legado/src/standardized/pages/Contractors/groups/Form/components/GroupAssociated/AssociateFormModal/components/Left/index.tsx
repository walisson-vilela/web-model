import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../../components/GridSelector/interfaces'
import { AssociatedGroup } from '../../../../../types'
import { identify } from '../../functions'
import Row from '../Row'

import { getAssociatedGroup } from './service'

const useLeft: TUseContentSelected<AssociatedGroup> = ({
  selected: [selected, setSelected],
}) => {
  const [search, setSearch] = useState<string>('')
  const [checked, setChecked] = useState<AssociatedGroup[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<AssociatedGroup>>([])

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const associatedGroup = await getAssociatedGroup(search)

      setRows(
        associatedGroup.map((data): Rows<AssociatedGroup>[number] => {
          const row: Rows<AssociatedGroup>[number] = {
            data,
            content: Row,
            ...(selected.some(
              (value) => value.subcontractor_id === data.subcontractor_id,
            )
              ? { disabled: true, checked: true }
              : {}),
          }
          return row
        }),
      )
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [selected, search])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev, ...checked].reduce((prev, e) => {
        return { ...prev, [e.subcontractor_id]: e }
      }, {} as { [key: AssociatedGroup['subcontractor_id']]: AssociatedGroup })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: 'Lista de Contas',
    gridSelector: {
      identify,
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhuma conta encontrada para a busca realizada'
          : 'Nenhuma conta encontrada',
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
      content: 'Adicionar',
      disabled: checked.length === 0,
    },
  }
}

export default useLeft

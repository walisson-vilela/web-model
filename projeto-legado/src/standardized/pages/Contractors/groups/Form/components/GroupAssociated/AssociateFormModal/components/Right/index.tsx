import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../../../../utils/Validators'
import { AssociatedGroup } from '../../../../../types'
import { identify } from '../../functions'
import Row from '../Row'

const useRight: TUseContentSelected<AssociatedGroup> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<AssociatedGroup>>([])
  const [checked, setChecked] = useState<AssociatedGroup[]>([])

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    setRows(
      selected.reduce<Rows<AssociatedGroup>>(
        (rows, data): Rows<AssociatedGroup> => {
          if (!strCmp(data.name, search, { contain: true })) return rows

          const row: Rows<AssociatedGroup>[number] = {
            data,
            content: Row,
          }
          return [...rows, row]
        },
        [],
      ),
    )

    setLoading(false)
  }, [selected, search])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        return { ...prev, [e.subcontractor_id]: e }
      }, {} as { [key: AssociatedGroup['subcontractor_id']]: AssociatedGroup })

      checked.forEach((e) => {
        delete newState[e.subcontractor_id]
      })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: 'Contas Associadas',
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
      color: 'warningRed',
      content: 'Remover',
      disabled: checked.length === 0,
    },
  }
}
export default useRight

import { useCallback, useEffect, useState } from 'react'

import GridSelector from '../../../../../../../../../components/GridSelector'
import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../../../utils/Validators'
import useManageAreaContext from '../../../../context'
import { identify } from '../../../../functions'
import { Segments } from '../../../../interface'
import { ActionTypeLabel } from '../../../../styles'
import Row from '../Row'

const useRight: TUseContentSelected<Segments> = ({
  selected: [selected, setSelected],
}) => {
  const [search, setSearch] = useState<string>('')

  const [rows, setRows] = useState<Rows<Segments>>([])
  const [checked, setChecked] = useState<Segments[]>([])

  const {
    loading,
    rule: [rule],
  } = useManageAreaContext()

  const initializeRows = useCallback(() => {
    const initialRows = selected.reduce<Rows<Segments>>((rows, data) => {
      if (
        ![data.name].some((e) => strCmp(e || '', search, { contain: true }))
      ) {
        return rows
      }

      const row: Rows<Segments>[number] = {
        data,
        content: Row,
      }
      return [...rows, row]
    }, [])
    setRows(initialRows)
  }, [selected, search])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        return { ...prev, [e.foreign_id]: e }
      }, {} as { [key: Segments['foreign_id']]: Segments })

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
    title: (
      <>
        Canais Associados | Tipo de Ação:{' '}
        <ActionTypeLabel>
          {GridSelector.ActionType.Constants.labels[rule]}
        </ActionTypeLabel>
      </>
    ),
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum Canal encontrado para a busca realizada'
          : 'Nenhum Canal encontrado',
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

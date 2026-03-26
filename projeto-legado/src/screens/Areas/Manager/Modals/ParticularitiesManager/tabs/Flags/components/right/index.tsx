import { useCallback, useEffect, useState } from 'react'

import GridSelector from '../../../../../../../../../components/GridSelector'
import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../../../utils/Validators'
import useManageAreaContext from '../../../../context'
import { identify } from '../../../../functions'
import { Flags } from '../../../../interface'
import { ActionTypeLabel } from '../../../../styles'
import Row from '../Row'

const useRight: TUseContentSelected<Flags> = ({
  selected: [selected, setSelected],
}) => {
  const [search, setSearch] = useState<string>('')

  const [rows, setRows] = useState<Rows<Flags>>([])
  const [checked, setChecked] = useState<Flags[]>([])

  const {
    loading,
    rule: [rule],
  } = useManageAreaContext()

  const initializeRows = useCallback(() => {
    const initialRows = selected.reduce<Rows<Flags>>((rows, data) => {
      if (
        ![data.name, data.chain, data.group].some((e) =>
          strCmp(e || '', search, { contain: true }),
        )
      ) {
        return rows
      }

      const row: Rows<Flags>[number] = {
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
      }, {} as { [key: Flags['foreign_id']]: Flags })

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
        Bandeiras Associadas | Tipo de Ação:{' '}
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
          ? 'Nenhuma Bnadeira encontrada para a busca realizada'
          : 'Nenhuma Bandeira encontrada',
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

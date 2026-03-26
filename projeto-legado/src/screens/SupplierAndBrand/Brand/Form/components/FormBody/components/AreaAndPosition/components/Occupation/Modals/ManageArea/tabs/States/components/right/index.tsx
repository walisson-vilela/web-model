import { useCallback, useEffect, useState } from 'react'

import GridSelector from '../../../../../../../../../../../../../../../../components/GridSelector'
import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../../../../../../../../../../utils/Validators'
import useManageAreaContext from '../../../../context'
import { identify } from '../../../../functions'
import { State } from '../../../../interface'
import Row from '../Row'

const useRight: TUseContentSelected<State> = ({
  selected: [selected, setSelected],
}) => {
  const [search, setSearch] = useState<string>('')

  const [rows, setRows] = useState<Rows<State>>([])
  const [checked, setChecked] = useState<State[]>([])

  const {
    rule: [rule],
  } = useManageAreaContext()

  const initializeRows = useCallback(() => {
    const initialRows = selected.reduce<Rows<State>>((rows, data) => {
      if (
        ![data.name, data.name_short].some((e) =>
          strCmp(e || '', search, { contain: true }),
        )
      ) {
        return rows
      }

      const row: Rows<State>[number] = {
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
      }, {} as { [key: State['foreign_id']]: State })

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
        Estados Associados | Tipo de Ação:{' '}
        <GridSelector.ActionTypeLabel>
          {GridSelector.ActionType.Constants.labels[rule]}
        </GridSelector.ActionTypeLabel>
      </>
    ),
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      messages: {
        empty: search.length
          ? 'Nenhum Estado encontrado para a busca realizada'
          : 'Nenhum Estado encontrado',
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

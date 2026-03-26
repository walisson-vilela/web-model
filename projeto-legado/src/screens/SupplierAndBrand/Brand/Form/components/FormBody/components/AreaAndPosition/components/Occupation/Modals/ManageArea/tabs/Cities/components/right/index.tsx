import { useCallback, useEffect, useState } from 'react'

import GridSelector from '../../../../../../../../../../../../../../../../components/GridSelector'
import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../../../../../../../../../../utils/Validators'
import useManageAreaContext from '../../../../context'
import { identify } from '../../../../functions'
import { City } from '../../../../interface'
import Row from '../Row'

const useRight: TUseContentSelected<City> = ({
  selected: [selected, setSelected],
}) => {
  const [search, setSearch] = useState<string>('')

  const [rows, setRows] = useState<Rows<City>>([])
  const [checked, setChecked] = useState<City[]>([])

  const {
    rule: [rule],
  } = useManageAreaContext()

  const initializeRows = useCallback(() => {
    const initialRows = selected.reduce<Rows<City>>((rows, data) => {
      if (
        ![data.name, data.state_name].some((e) =>
          strCmp(e || '', search, { contain: true }),
        )
      ) {
        return rows
      }

      const row: Rows<City>[number] = {
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
      }, {} as { [key: City['foreign_id']]: City })

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
        Cidades Associadas | Tipo de Ação:{' '}
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
          ? 'Nenhuma Cidade encontrada para a busca realizada'
          : 'Nenhuma Cidade encontrada',
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

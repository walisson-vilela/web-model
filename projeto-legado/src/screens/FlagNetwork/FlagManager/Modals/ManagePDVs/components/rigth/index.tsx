import { useCallback, useContext, useEffect, useState } from 'react'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../utils/Validators'
import Context from '../../context'
import { StoreProps } from '../interface'
import Row from '../left/components/Row'

const useRight: TUseContentSelected<StoreProps> = ({
  selected: [selected, setSelected],
}) => {
  const [search, setSearch] = useState<string>('')

  const [rows, setRows] = useState<Rows<StoreProps>>([])
  const [checked, setChecked] = useState<StoreProps[]>([])

  const {
    loading: [loading],
  } = useContext(Context)

  const initializeRows = useCallback(() => {
    const initialRows = selected.reduce<Rows<StoreProps>>((rows, data) => {
      if (!strCmp(data.stores_contractor.nickname, search, { contain: true }))
        return rows

      const row: Rows<StoreProps>[number] = {
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
        return { ...prev, [e.id]: e }
      }, {} as { [key: StoreProps['id']]: StoreProps })

      checked.forEach((e) => {
        delete newState[e.id]
      })

      return Object.keys(newState).map((k) => newState[k])
    })
    setChecked([])
  }

  useEffect(() => {
    initializeRows()
  }, [initializeRows])

  return {
    title: <b>PDVs Associados</b>,
    gridSelector: {
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum PDV encontrado para a busca realizada'
          : 'Nenhum PDV encontrado',
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

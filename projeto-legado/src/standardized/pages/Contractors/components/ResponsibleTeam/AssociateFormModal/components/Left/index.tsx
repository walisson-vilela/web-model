import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../components/GridSelector/interfaces'
import { AssociatedUser } from '../../../types'
import { identify } from '../../functions'
import Row from '../Row'

import { getUsersAssociated } from './service'

const useLeft: TUseContentSelected<AssociatedUser> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<AssociatedUser>>([])
  const [checked, setChecked] = useState<AssociatedUser[]>([])

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const usersAssociated = await getUsersAssociated(search)

      setRows(
        usersAssociated.map((data): Rows<AssociatedUser>[number] => {
          const checked = selected.some(
            (value) => value.person_id === data.person_id,
          )
          const row: Rows<AssociatedUser>[number] = {
            data,
            content: Row,
            checked,
            disabled: checked,
          }
          return row
        }),
      )
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [selected, search])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev, ...checked].reduce((prev, e) => {
        return { ...prev, [e.person_id]: e }
      }, {} as { [key: AssociatedUser['person_id']]: AssociatedUser })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  return {
    title: 'Lista de Usuários',
    gridSelector: {
      identify,
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum usuário encontrado para a busca realizada'
          : 'Nenhum usuário encontrado',
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

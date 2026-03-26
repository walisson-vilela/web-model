import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../../utils/Validators'
import { AssociatedUser } from '../../../types'
import { identify } from '../../functions'
import Row from '../Row'

const useRight: TUseContentSelected<AssociatedUser> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<AssociatedUser>>([])
  const [checked, setChecked] = useState<AssociatedUser[]>([])

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    setRows(
      selected.reduce<Rows<AssociatedUser>>(
        (rows, data): Rows<AssociatedUser> => {
          if (!strCmp(data.name, search, { contain: true })) return rows

          const row: Rows<AssociatedUser>[number] = {
            data,
            content: Row,
            disabled: data.role?.master,
            ...(data.role?.master
              ? {
                  disabled: true,
                  popup: {
                    content: 'Não é possivel desassociar o usuário Master.',
                    position: 'left center',
                    inverted: true,
                  },
                }
              : {}),
          }
          return [...rows, row]
        },
        [],
      ),
    )

    setLoading(false)
  }, [selected, search])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        return { ...prev, [e.person_id]: e }
      }, {} as { [key: AssociatedUser['person_id']]: AssociatedUser })

      checked.forEach((e) => {
        if (!e.role?.master) delete newState[e.person_id]
      })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  return {
    title: 'Usuários Associados',
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
      color: 'warningRed',
      content: 'Remover',
      disabled: checked.length === 0,
    },
  }
}

export default useRight

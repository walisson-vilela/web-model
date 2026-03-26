import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../../../components/GridSelector/interfaces'
import { strCmp } from '../../../../../../../../../utils/Validators'
import { HierarchyUser } from '../../../../../../types'
import useMirroringModalContext from '../../context'
import Row from '../Row'
import { identify } from '../functions'

const useRight: TUseContentSelected<HierarchyUser> = ({
  selected: [selected, setSelected],
}) => {
  const [search, setSearch] = useState<string>('')
  const [rows, setRows] = useState<Rows<HierarchyUser>>([])
  const [checked, setChecked] = useState<HierarchyUser[]>([])

  const {
    loading: [loading, setLoading],
    hierarchyId,
    hierarchiesUser,
  } = useMirroringModalContext()

  const initializeRows = useCallback(async () => {
    setLoading(true)

    try {
      const parsed = selected.reduce<Rows<HierarchyUser>>((parsed, e) => {
        const strings = [
          e.user.id.toString(),
          e.user.name,
          e.user.role.name,
          e.user.person.registration,
        ]

        if (!strings.some((str) => strCmp(str, search, { contain: true }))) {
          return parsed
        }

        return [
          ...parsed,
          {
            data: e,
            content: Row,
          },
        ]
      }, [])

      setRows([...parsed])
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [hierarchyId, hierarchiesUser.user.id, selected, search])

  const onSubmit = useCallback(() => {
    setSelected((prev) => {
      const map = prev.reduce((acc, e) => {
        acc[e.user.id] = e
        return acc
      }, {} as Record<number, HierarchyUser>)

      checked.forEach((e) => {
        delete map[e.user.id]
      })

      const updated = Object.values(map)
      return updated
    })

    setChecked([])
  }, [checked, setSelected])

  useEffect(() => {
    initializeRows()
  }, [initializeRows])

  return {
    title: <div style={{ height: '20px' }} />,
    gridSelector: {
      identify,
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading: loading,
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
      content: 'Remover',
      color: 'red',
      disabled: checked.length === 0,
      size: 'small',
    },
  }
}

export default useRight

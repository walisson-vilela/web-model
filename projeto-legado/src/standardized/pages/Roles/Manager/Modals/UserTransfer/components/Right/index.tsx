import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContent,
} from '../../../../../../../../components/GridSelector/interfaces'
import useContext from '../../context'
import { Role } from '../../interfaces'

import { Row, Title } from './components'
import { getRoles } from './service'

const useRight: TUseContent<Role> = () => {
  const {
    right: [checked, setChecked],
    data,
    licenses: [, , useLicense],
    left: [left],
  } = useContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<Role>>([])

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  const onLoadRows = useCallback(async () => {
    setLoading(true)

    try {
      const { data: roles, pagination } = await getRoles(
        search,
        data.id,
        data.hierarchies,
        data.internal_access,
        page,
      )

      const rows = roles.map((role): Rows<Role>[number] => {
        const disabled = (() => {
          // Caso a função tenha o MESMO tipo de acesso da função recebida como propriedade no modal
          if (role.access_level_id === data.access_level_id) {
            return role.hierarchies.some((x) => {
              const { consumed, reserved } = useLicense(
                role.access_level_id,
                x.hierarchy_id,
              )

              const available = reserved - consumed

              return (
                // Houver um pilar nessa função que não exista na função recebida como propriedade no modal, e
                !data.hierarchies.some(
                  (y) => x.hierarchy_id === y.hierarchy_id,
                ) &&
                // a quantidade licenças disponíveis for menor que a quantidade de usuários selecionados
                available < left.length
              )
            })
          }

          // Caso a função tenha o tipo de acesso DIFERENTE da função recebida como propriedade no modal
          return role.hierarchies.some((x) => {
            const { consumed, reserved } = useLicense(
              role.access_level_id,
              x.hierarchy_id,
            )
            const available = reserved - consumed

            return (
              // a quantidade licenças disponíveis for menor que a quantidade de usuários selecionados
              available < left.length
            )
          })
        })()

        const row: Rows<Role>[number] = {
          data: role,
          content: Row,
          disabled: disabled,
          popup: {
            on: 'click',
            content: 'Cotas insuficientes.',
            hoverable: true,
            inverted: true,
            disabled: !disabled,
          },
        }

        return row
      })

      setRows(page === 1 ? rows : (prev) => [...prev, ...rows])
      setLastPage(!pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [search, data.id, page, useLicense, left.length])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: Title,
    gridSelector: {
      rows,
      type: 'radio',
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhuma Função encontrada na busca realizada'
          : 'Nenhuma Função encontrada',
      },
      toolbar: {
        checkAll: true,
        search: {
          submitted: [search, setSearch],
        },
      },
      pagination: {
        page: [page, setPage],
        lastPage,
      },
    },
  }
}

export default useRight

import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'

import Modal, { ModalState } from '../../../../../components/MwModal'
import { UseState } from '../../../../interfaces'
import { Permissions } from '../../../Home/tabs/Favorites/interfaces'
import { shareTypesOptions } from '../labels'

import header from './header'
import { SemanticDropdown } from './styles'

interface ManagerProps {
  listState: UseState<Permissions[]>
  checkedsState: UseState<Permissions[]>
}

const Manager = ({ listState, checkedsState }: ManagerProps) => {
  const [list, setList] = listState

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState>(null)
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<Permissions[]>([])
  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = checkedsState
  // estado controlador do modal
  const [modal, setModal] = useState<ModalState>(null)

  const onChangeShareType = (people_id: number, value: string) => {
    setList((prev) => {
      const aux = [...prev]
      const index = aux.findIndex((e) => e.people_id === people_id)

      if (index > -1) {
        aux[index].role = value
      }

      return aux
    })
  }

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    let parsed = [...list]
      .filter((item) => item.role !== 'owner')
      .map((item) => ({
        ...item,
        role_jsx: (
          <SemanticDropdown
            text={
              shareTypesOptions.find((type) => item.role === type.value).label
            }
          >
            <SemanticDropdown.Menu>
              {shareTypesOptions.map((type, index) => (
                <SemanticDropdown.Item
                  key={index}
                  text={type.label}
                  value={type.value}
                  onClick={(_, data) =>
                    onChangeShareType(item.people_id, data.value as string)
                  }
                />
              ))}
            </SemanticDropdown.Menu>
          </SemanticDropdown>
        ),
      }))

    if (search) {
      const regex = new RegExp(search, 'i')

      parsed = parsed.filter((e) => e.people_name.search(regex) > -1)
    }

    if (sort) {
      parsed = parsed.sort((a, b) => {
        if (sort.sort === 'people_id') {
          if (a.people_id < b.people_id) {
            return sort.direction === 'ASC' ? -1 : 1
          }

          if (a.people_id > b.people_id) {
            return sort.direction === 'ASC' ? 1 : -1
          }

          return 0
        }

        const compare = a[sort.sort]
          .toLocaleLowerCase()
          .localeCompare(b[sort.sort].toLocaleLowerCase())

        if (!compare) return 0

        return sort.direction === 'ASC' ? compare : compare * -1
      })
    }

    setBody(parsed)
  }, [search, sort, list])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  const onClickDelete = () => {
    if (checkeds.length === 0) return

    setModal({
      title: 'Deletar',
      titleColor: 'white',
      content:
        checkeds.length === 1 ? (
          <React.Fragment>
            Você deseja deletar o compartilhamento feito ao usuário{' '}
            <b>{checkeds[0].people_name}</b>?
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você deseja deletar o compartilhamento feito aos{' '}
            <b>{checkeds.length} usuários</b>?
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Deletar',
          color: 'red',
          style: { marginRight: 0 },
          onClick: async () => {
            setList((prev) =>
              [...prev].filter(
                (item) =>
                  !checkeds.map((e) => e.people_id).includes(item.people_id),
              ),
            )

            setModal(null)
          },
        },
      ],
    })
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        {
          rule: () => checkeds.length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos um favorito.',
        },
      ],
    },
  ]

  return (
    <React.Fragment>
      <Toolbar search={{ search, setSearch }}>
        <Dropdown
          items={dropdownItems}
          loading={false}
          axis='y'
          centerCoodinates={{ y: 100 }}
        />
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        loading={false}
        checkeds={{ checkeds, setCheckeds }}
        hasFilters={false}
      />

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager

import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast, { Toaster } from 'react-hot-toast'

import ManagerCounter from '../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { ManagerProps } from '../../../../screens/interfaces'

import * as Modals from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { extractData, getRoles, sumbmitMenusRoles } from './service'

const Manager = (props: ManagerProps) => {
  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)
  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])

  // estado que controla há um modal aberto
  const [modal, setModal] = useState<ModalState>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      // fazendo requisição dos dados
      const responseData = await getRoles(appliedFilters, search, sort, page)

      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição
      const results = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
      console.error(error)

      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page])

  // essa função sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const getItemMenu = (
    item: BodyInterface,
  ): DropdownInterfaces.Item[] | string =>
    item.master
      ? 'A Função Master não tem ações neste menu.'
      : [
          {
            content: 'Editar',
            onClick: () => {
              setModal(
                <Modals.CreateUserFunctionModal
                  onClose={() => setModal(null)}
                  item={item}
                  reload={() => reload()}
                />,
              )
            },
            rules: [],
          },
          {
            content: 'Transferir Usuário',
            onClick: () =>
              setModal(
                <Modals.UserTransfer
                  data={item}
                  close={() => setModal(null)}
                  reload={reload}
                />,
              ),
            rules: [],
          },
          {
            content: 'Gerenciar Menu',
            border: true,
            onClick: () =>
              setModal(
                <Modals.ManageMenus
                  onClose={() => setModal(null)}
                  loadSelectedMenus={async () => item.menus}
                  onSubmit={async (menus) => {
                    await sumbmitMenusRoles(item.id, menus)
                    toast(<ToasterContent color='normal' />, SuccessStyle)
                    reload()
                  }}
                  title={
                    <React.Fragment>
                      Função: <b>{item.name}</b> -{' '}
                      {item.user_count.toString().padStart(2, '0')}{' '}
                      {item.user_count === 1
                        ? 'Usuário Associado'
                        : 'Usuários Associados'}
                    </React.Fragment>
                  }
                />,
              ),
            rules: [],
          },
        ]

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => checked.status === 'I')

    if (toUpdate.length === 0) return

    setModal(
      <Modals.ActivateModal
        checkeds={toUpdate}
        onClosed={() => setModal(null)}
        reload={() => reload()}
      />,
    )
  }

  const onClickInactivate = () => {
    const toUpdate = checkeds.filter(
      (checked) =>
        checked.status === 'A' &&
        checked.master !== true &&
        checked.user_count < 1 &&
        !checked.hierarchies.some((e) => e.hierarchy_structure_id !== null),
    )

    if (toUpdate.length === 0) return

    setModal(
      <Modals.InatctiveModal
        checkeds={toUpdate}
        isNotActivate={toUpdate.length !== checkeds.length}
        onClosed={() => setModal(null)}
        reload={reload}
      />,
    )
  }

  const onClickDelete = () => {
    const toUpdate = checkeds.filter(
      (checked) =>
        !checked.default &&
        checked.user_count < 1 &&
        !checked.hierarchies.some((e) => e.hierarchy_structure_id !== null),
    )

    if (toUpdate.length === 0) return

    setModal(
      <Modals.DeleteModal
        isNotDelete={checkeds.length !== toUpdate.length}
        checkeds={toUpdate}
        onClosed={() => setModal(null)}
        reload={reload}
      />,
    )
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        {
          rule: () => checkeds.some((checked) => checked.status === 'I'),

          message:
            'Para realizar à ação é necessário selecionar pelo menos uma função inativa.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        {
          rule: () =>
            checkeds.filter((checked) => checked.status === 'A').length > 0,
          message:
            'Para realizar à ação é necessário selecionar pelo menos uma função ativa.',
        },
        {
          rule: () =>
            checkeds.some(
              (checked) =>
                checked.master !== true &&
                checked.user_count < 1 &&
                !checked.hierarchies.some(
                  (e) => e.hierarchy_structure_id !== null,
                ),
            ),
          message:
            'Vocẽ não pode Inativar funções Master ou que tenham usuários associados ou estejam em uma hierarquia.',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        {
          rule: () => checkeds.length > 0,
          message:
            'Para realizar à ação é necessário selecionar pelo menos uma função.',
        },
        {
          rule: () =>
            checkeds.some(
              (checked) =>
                !checked.default &&
                checked.user_count < 1 &&
                !checked.hierarchies.some(
                  (e) => e.hierarchy_structure_id !== null,
                ),
            ),
          message:
            'Vocẽ não pode Deletar funções padrão, ou que tenham usuários associados ou estejam em uma hierarquia.',
        },
      ],
    },
    {
      content: 'Extrair dados',
      onClick: () => {
        extractData(
          appliedFilters,
          search,
          sort,
          body.map((item) => item.id),
        )
      },
      rules: [],
    },
  ]

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <MwButton
          size='small'
          content='Criar Função'
          onClick={() =>
            setModal(
              <Modals.CreateUserFunctionModal
                onClose={() => setModal(null)}
                reload={() => reload()}
              />,
            )
          }
        />

        <Dropdown
          items={dropdownItems}
          loading={loading}
          axis='y'
          centerCoodinates={{ y: 100 }}
        />
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        checkeds={{ checkeds, setCheckeds }}
        centerCoodinates={{ y: 73 }}
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />

      <Toaster position='bottom-right' />

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager

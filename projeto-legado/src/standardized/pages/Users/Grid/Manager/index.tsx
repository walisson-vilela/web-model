import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { Toaster, toast } from 'react-hot-toast'
import { RouteComponentProps } from 'react-router-dom'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import EventsManager from '../../../../../screens/Users/Modals/EventsManager'
import { ManagerProps } from '../../../../../screens/interfaces'
import { PERSON_STATUS } from '../../labels'

import ScheduledActivation from './Modals/ScheduledActivation'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { extractUsers, getUsers as request } from './services'

const Manager = (props: ManagerProps & { route: RouteComponentProps }) => {
  const { route } = props
  const { history } = route
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
  // estado controlador do modal
  const [modal, setModal] = useState<ModalState>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      // fazendo requisição dos dados
      const responseData = await request(appliedFilters, search, sort, page)

      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição
      const results = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(page === 1 ? results : (prev) => [...prev, ...results])
    } catch (e) {
      console.error(e)
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

  // função que retorna os itens do menu lateral
  const getItemMenu = (
    item: BodyInterface,
  ): DropdownInterfaces.Item[] | string => {
    return item.role?.master === true
      ? 'O Usuário Master não tem ações neste menu'
      : [
          {
            content: 'Editar',
            onClick: () => history.push(`/main/users/home/edit/${item.id}`),
            rules: [],
          },
          {
            content: 'Gerenciar Eventos',
            onClick: () =>
              setModal(
                <EventsManager
                  reload={() => reload()}
                  name={item.name}
                  user_id={item.id}
                  close={() => setModal(null)}
                />,
              ),
            rules: [
              {
                rule: () => {
                  const allowed: (keyof typeof PERSON_STATUS)[] = ['A', 'T']

                  return (allowed as string[]).includes(item.status.value)
                },
                message: `Ação desabilitada para usuários com status "${item.status.label}"`,
              },
            ],
          },
        ]
  }

  const onClickExtractData = async () => {
    setLoading(true)
    try {
      await extractUsers(appliedFilters, search, sort, page, [])
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Ativação em Massa',
      onClick: () =>
        setModal(
          <ScheduledActivation
            search={search}
            sort={sort}
            appliedFilters={appliedFilters}
            onClose={() => setModal(null)}
            onReload={reload}
          />,
        ),
      rules: [],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
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
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />

      <Modal modal={modal} />

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager

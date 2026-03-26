import React, { useCallback, useEffect, useState } from 'react'

import { DropdownInterfaces, MwManager, Toolbar } from '@mw-kit/mw-manager'
import { Toaster } from 'react-hot-toast'
import { Modal } from 'semantic-ui-react'

import ManagerCounter from '../../../../components/ManagerCounter'
import { PrivacyPolicity, UsersList } from '../Modals'

import filters from './filters'
import { selectHeaderById } from './header'
import {
  ComponentProps,
  CurrentBodyInterface,
  CurrentDataInterface,
  ExpiredBodyInterface,
  ExpiredDataInterface,
} from './interfaces'
import parseData, {
  parserPropsToPrivacyPolicity,
  parserPropsToUserList,
} from './parser'
import { getData as request } from './services'

const Manager = (props: ComponentProps) => {
  const { tabId } = props
  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  // estado controlador dos dados recebidos
  const [data, setData] = useState<
    CurrentDataInterface[] | ExpiredDataInterface[]
  >([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<
    CurrentBodyInterface[] | ExpiredBodyInterface[]
  >([])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)
  // estado que controla há um modal aberto
  const [openedModal, setOpenedModal] = useState<JSX.Element | null>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados
      const responseData = await request(
        tabId,
        appliedFilters,
        search,
        sort,
        page,
      )
      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição
      const results = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [appliedFilters, search, sort, page])

  // essa função sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setBody(parseData(tabId, data))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  // função que retorna os itens do menu lateral
  const getItemMenu = (
    item: ExpiredBodyInterface | CurrentBodyInterface,
  ): DropdownInterfaces.Item[] | string => [
    {
      content: 'Ver Documento',
      onClick: () =>
        setOpenedModal(
          <Modal
            style={{ borderRadius: 0 }}
            size='large'
            open
            children={
              <PrivacyPolicity
                onClose={() => setOpenedModal(null)}
                tabId={tabId}
                data={parserPropsToPrivacyPolicity(tabId, item)}
              />
            }
          />,
        ),
      rules: [],
    },
    {
      content: 'Listar Usuários',
      onClick: () => {
        setOpenedModal(
          <Modal
            style={{ borderRadius: 0 }}
            size='large'
            open
            children={
              <UsersList
                tabId={tabId}
                onClose={() => setOpenedModal(null)}
                data={parserPropsToUserList(tabId, item)}
              />
            }
          />,
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
      ></Toolbar>

      <MwManager
        columns={selectHeaderById(tabId)}
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
      {openedModal}
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager

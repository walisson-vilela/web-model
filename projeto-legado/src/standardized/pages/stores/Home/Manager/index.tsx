import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { RouteComponentProps } from 'react-router'
import { Button } from 'semantic-ui-react'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { ManagerProps } from '../../../../../screens/interfaces'
import { numberOrDefault } from '../../../../../utils/Formatters'
import { isNumber } from '../../../../../utils/Validators'

import * as M from './Modals'
import ModalPdvContext from './Modals/provider'
import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import {
  deleteMultiple,
  extractData,
  getStores as request,
  submitToAudit,
  toggleStatus,
} from './services'

const Manager = (props: ManagerProps & { route: RouteComponentProps }) => {
  const {
    route: { history },
  } = props

  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
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
  // estado controlador do modal
  const [modal, setModal] = useState<ModalState | null>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    // fazendo requisição dos dados e listagem dos PDV's
    const responseData = await request(appliedFilters, search, sort, page)

    // setando dados sobre a paginação
    const { has_next_page = false, count: total_registries = 0 } =
      responseData.pagination || {}

    setIsLastPage(!has_next_page)
    setTotalRegistries(total_registries)

    // pegando os resultados da requisição
    const results = responseData.data || []

    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setData(page === 1 ? results : (prev) => prev.concat(results))

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
    setBody(parseData(data))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () => history.push(`/main/stores/home/edit/${item.id}`),
        rules: [],
      },
    ]
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message: 'Para realizar a ação é necessário selecionar pelo menos um PDV',
  }

  const onClickActivate = () => {
    setModal(<M.Activate />)
  }

  const onClickInactivate = () => {
    setModal(<M.Inactivate />)
  }

  const onClickDelete = () => {
    setModal(<M.Delete />)
  }

  const onClickExtractData = async (): Promise<void> => {
    setLoading(true)

    try {
      await extractData(
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((e) => numberOrDefault(e.id)),
      )
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.error(error)
    }

    setLoading(false)
  }

  const onClickSubmitToAudit = () => {
    if (checkeds.length === 0) return

    setModal(<M.ToAudit />)
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return checkeds.filter((checked) => !checked.status).length > 0
          },
          message:
            'Para realizar a ação é necessário selecionar pelo menos um PDV inativo',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return checkeds.filter((checked) => checked.status).length > 0
          },
          message:
            'Para realizar a ação é necessário selecionar pelo menos um PDV ativo',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [noneSelectedRule],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      border: true,
      rules: [],
    },
    {
      content: 'Submeter Auditoria de Campo',
      onClick: onClickSubmitToAudit,
      border: true,
      rules: [noneSelectedRule],
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
        <Button
          primary
          size='tiny'
          content='Criar PDV'
          onClick={() => history.push('/main/stores/home/create')}
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
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />
      <ModalPdvContext.Provider
        value={{
          checkeds,
          reload,
          setLoading,
          setModal,
          toggleStatus,
          deleteMultiple,
          submitToAudit,
        }}
      >
        <Modal modal={modal} />
      </ModalPdvContext.Provider>
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager

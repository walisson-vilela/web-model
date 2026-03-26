import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { isNumber } from 'lodash'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { ManagerProps } from '../../../../../screens/interfaces'
import * as ModalManager from '../../../../components/modals'

import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import * as Modals from './modals'
import parseData from './parser'
import {
  extractData,
  getContractorsMenus,
  getContractors as request,
  updateContractor,
} from './services'

const ContractorsManager = (props: ManagerProps) => {
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

  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])

  const [notificationModal, setNotificationModal] = useState<ModalState>(null)

  const history = useHistory()

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    try {
      setLoading(true)

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
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
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

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setBody(parseData(data))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  // função que retorna os itens do menu lateral
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Gerenciar Menu',
        onClick: () =>
          setNotificationModal(
            <ModalManager.ManageMenus
              loadSelectedMenus={async () => await getContractorsMenus(item.id)}
              onSubmit={async (ids) => {
                await updateContractor(item.id, {
                  contractors_menus: ids.map((id) => ({ menu_id: id })),
                })
                toast(<ToasterContent color='normal' />, SuccessStyle)
              }}
              onClose={() => setNotificationModal(null)}
              title={
                <React.Fragment>
                  Conta: <b>{item.casual_name}</b>
                </React.Fragment>
              }
            />,
          ),

        rules: [
          {
            rule: () => item.master === false,
            message: 'O Menu da conta Master não é gerenciável.',
          },
        ],
      },
      {
        content: 'Editar',
        onClick: () =>
          history.push(`/main/accounts/contractors/edit/${item.id}`),
        rules: [],
      },
    ]
  }

  const onClickExtractData = async (): Promise<void> => {
    setLoading(true)

    try {
      await extractData(
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((e) => e.id),
      )
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const noneSelectedRule = (type?: string) => {
    return {
      rule: () => checkeds.filter((checked) => isNumber(checked.id)).length > 0,
      message: `Para realizar à ação é necessário selecionar pelo menos uma conta ${
        type ? type + '.' : '.'
      }`,
    }
  }

  const isAllMasterRule = (type: string) => {
    return {
      rule: () =>
        !checkeds.every((checked) => checked.master) ||
        checkeds.some((checked) => checked.master === false),
      message: `Não é possível ${type} contas do tipo Master.`,
    }
  }

  const onClickActive = () => {
    if (checkeds.length === 0) return

    const filterAtive = checkeds.filter(
      (e) => e.master === false && e.active === 0,
    )

    setNotificationModal(
      <Modals.Activate
        invalidAtive={filterAtive.length !== checkeds.length}
        checkeds={filterAtive}
        reload={reload}
        close={() => setNotificationModal(<React.Fragment></React.Fragment>)}
      />,
    )
  }

  const onClickInative = () => {
    const filterInative = checkeds.filter(
      (e) => e.master === false && e.active === 1,
    )

    if (filterInative.length === 0) return

    setNotificationModal(
      <Modals.Inactivate
        invalidInative={filterInative.length !== checkeds.length}
        checkeds={filterInative}
        reload={reload}
        close={() => setNotificationModal(<React.Fragment></React.Fragment>)}
      />,
    )
  }

  const onClickDelete = () => {
    const filterDelete = checkeds.filter((e) => e.master === false)
    if (filterDelete.length === 0) return

    setNotificationModal(
      <Modals.Delete
        invalidDelete={filterDelete.length !== checkeds.length}
        checkeds={filterDelete}
        reload={reload}
        close={() => setNotificationModal(<React.Fragment></React.Fragment>)}
      />,
    )
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActive,
      rules: [
        noneSelectedRule('inativa'),
        isAllMasterRule('ativar'),
        {
          rule: () =>
            checkeds.filter((checked) => checked.active === 0).length > 0,
          message:
            'Para realizar à ação é necessário selecionar pelo menos uma conta inativa.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInative,
      rules: [
        noneSelectedRule('ativa'),
        isAllMasterRule('inativar'),
        {
          rule: () =>
            checkeds.filter(
              (checked) => checked.active === 1 && checked.master === false,
            ).length > 0,
          message:
            'Para realizar à ação é necessário selecionar pelo menos uma conta ativa.',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        noneSelectedRule(),
        isAllMasterRule('deletar'),
        {
          rule: () => checkeds.length > 0,
          message:
            'Para realizar à ação é necessário selecionar pelo menos uma conta.',
        },
      ],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      rules: [],
      border: true,
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
          content='Nova Conta'
          onClick={() => history.push('/main/accounts/contractors/create')}
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
      <Toaster position='bottom-right' />

      <Modal modal={notificationModal} />
    </React.Fragment>
  )
}

export default ContractorsManager

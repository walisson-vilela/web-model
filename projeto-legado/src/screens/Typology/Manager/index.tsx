import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { Toaster } from 'react-hot-toast'
import { Button } from 'semantic-ui-react'

import ManagerCounter from '../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../components/MwModal'
import { isNumber } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'

import * as Modals from './Modals'
import filters from './filters'
import { isUnknownTypology } from './functions'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { extractData, getTypologies as request } from './services'

const Manager = (props: ManagerProps) => {
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

  // estado que controla qual modal está aberto
  const [notificationModal, setNotificationModal] = useState<ModalState>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
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
    setBody(parseData(data, setNotificationModal))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  // função que retorna os itens do menu lateral

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () =>
          setNotificationModal(
            <Modals.FormModal
              reload={reload}
              setOpen={setNotificationModal}
              editData={item}
            />,
          ),
        rules: [
          {
            // TODO: criar Styledcomponents para tamanho da fonte e altura da linha e espaçamento.
            rule: () => !item.default_id,
            message: 'A tipologia padrão não pode ser editada.',
          },
        ],
      },
      {
        content: 'Transferir PDVs',
        onClick: () =>
          setNotificationModal(
            <Modals.PDVTransferModal
              onClose={() => setNotificationModal(<></>)}
              reload={reload}
              typology={item}
            />,
          ),
        border: true,
        rules: [
          {
            rule: () => item.store_number !== 0,
            message: 'A tipologia não possui PDVs associados.',
          },
        ],
      },
    ]
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message:
      'Para realizar a ação é necessário selecionar pelo menos uma tipologia',
  }

  const listRule = {
    rule: () => checkeds.some((checked) => checked.list !== false),
    message:
      'Para realizar à ação é necessário selecionar pelo menos uma Tipologia',
  }

  const onClickActivate = () => {
    const unknownTypology = checkeds.some(isUnknownTypology)

    const toUpdate = checkeds.filter(
      (checked) => !checked.active && checked.list,
    )

    if (toUpdate.length === 0) return

    setNotificationModal(
      <Modals.Activate
        unknownTypology={unknownTypology}
        checkeds={toUpdate}
        close={() => setNotificationModal(<></>)}
        reload={reload}
      />,
    )
  }

  const onClickInactivate = () => {
    const unknownTypology = checkeds.some(isUnknownTypology)

    const toUpdate = checkeds.filter(
      (checked) => checked.active && checked.list,
    )

    if (toUpdate.length === 0) return

    setNotificationModal(
      <Modals.Inactivate
        unknownTypology={unknownTypology}
        checkeds={toUpdate}
        close={() => setNotificationModal(<></>)}
        reload={reload}
      />,
    )
  }

  const onClickDelete = () => {
    const toUpdate = checkeds.filter((checked) => !checked.default_id)

    const storesTypology = checkeds.some((checked) => checked.store_number > 0)

    if (toUpdate.length === 0) return

    setNotificationModal(
      <Modals.Delete
        storesTypology={storesTypology}
        defaultTypology={toUpdate.length !== checkeds.length}
        checkeds={toUpdate}
        close={() => setNotificationModal(<></>)}
        reload={reload}
      />,
    )
  }

  const onClickExtractData = async (): Promise<any> => {
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
      alert('Erro ao extrair dados')
    }

    setLoading(false)
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        listRule,
        {
          rule: () =>
            checkeds.some(
              (checked) => checked.list !== false && checked.active === false,
            ),
          message:
            'Para realizar à ação selecione pelo menos uma Tipologia Inativa.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        listRule,
        {
          rule: () =>
            checkeds.some(
              (checked) => checked.list !== false && checked.active === true,
            ),
          message:
            'Para realizar à ação selecione pelo menos uma Tipologia Ativa.',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return checkeds.some((checked) => !checked.default_id)
          },
          message: `Você não pode deletar uma Tipologia Padrão`,
        },
      ],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      border: true,
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
        <Button
          primary
          size='tiny'
          content='Criar Tipologia'
          onClick={() =>
            setNotificationModal(
              <Modals.FormModal
                reload={reload}
                setOpen={setNotificationModal}
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
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />

      <Toaster position='bottom-right' />
      <Modal modal={notificationModal} />
    </React.Fragment>
  )
}

export default Manager

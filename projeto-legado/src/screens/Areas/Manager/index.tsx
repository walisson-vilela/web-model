import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from 'semantic-ui-react'

import ManagerCounter from '../../../components/ManagerCounter'
import Modal from '../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../components/Toaster'
import { isNumber } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'
import { Hierarchy } from '../types'

import * as Modals from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { extractData, getRegions as request } from './services'

const Manager = (props: ManagerProps & { hierarchy: Hierarchy }) => {
  const {
    hierarchy,
    // estado controlador do valor do input de pesquisa
    search: { search, setSearch },
    // estado controlador da ordenação
    sort: { sort, setSort },
    // estado controlador dos filtros aplicados
    appliedFilters: { appliedFilters, setAppliedFilters },
    modal: [modal, setModal],
  } = props

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

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)
    // fazendo requisição dos dados
    try {
      const responseData = await request(
        appliedFilters,
        hierarchy.id,
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
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page, hierarchy.id])

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
    setBody(parseData(data, setModal))
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
          setModal(
            <Modals.Create
              hierarchy_id={hierarchy.id}
              data={item}
              close={() => setModal(null)}
              reload={reload}
            />,
          ),
        rules: [],
      },
      {
        content: 'Transferir Usuários',
        onClick: () => {
          setModal(
            <Modals.UserTransfer
              data={item}
              reload={reload}
              close={() => setModal(null)}
              hierarchy={hierarchy}
            />,
          )
        },
        rules: [
          {
            rule: () => item.user_count_value > 0,
            message: 'A área não possui usuários associados',
          },
        ],
        border: true,
      },
      {
        content: 'Gerenciar Área',
        onClick: () =>
          setModal(
            <Modals.ManageArea
              data={item}
              reload={reload}
              close={() => setModal(null)}
            />,
          ),
        rules: [],
      },
      {
        content: (
          <>
            Particularidades
            <br />
            Canal/Bandeira
          </>
        ),
        onClick: () =>
          setModal(
            <Modals.ParticularitiesManager
              data={item}
              reload={reload}
              close={() => setModal(null)}
            />,
          ),
        rules: [
          {
            rule: () =>
              item.state_count_value > 0 ||
              item.city_count_value > 0 ||
              item.sublocality_count_value > 0,
            // TODO: Adicionar negrito no Gerenciar Area quando for possível
            message:
              'Para habilitar as particularidades antes é necessário Gerenciar Área',
          },
        ],
      },
    ]
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message: 'Para realizar a ação é necessário selecionar pelo menos uma área',
  }

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => !checked.status_value)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Active
        reload={reload}
        setOpenedModal={setModal}
        regions={toUpdate}
      />,
    )
  }

  const onClickInactivate = () => {
    const active = checkeds.filter((checked) => checked.status_value)
    const toUpdate = active.filter((checked) => checked.user_count_value < 1)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Inactive
        reload={reload}
        setOpenedModal={() => setModal(null)}
        regions={toUpdate}
        hasInvalid={toUpdate.length !== active.length}
      />,
    )
  }

  const onClickDelete = () => {
    const toUpdate = checkeds.filter((checked) => checked.user_count_value < 1)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Delete
        reload={reload}
        setConfirmModal={setModal}
        regions={toUpdate}
        hasInvalid={checkeds.length !== toUpdate.length}
      />,
    )
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      await extractData(
        hierarchy.id,
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((e) => e.id),
      )
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.error(error)
    }

    setLoading(false)
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        {
          rule: () =>
            checkeds.filter((checked) => !checked.status_value).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma área de atuação inativa.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () =>
            checkeds.filter((checked) => checked.status_value).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma área de atuação ativa',
        },
        {
          rule: () => {
            return checkeds.some(
              (e) => e.user_count_value === 0 && e.route_count_value === 0,
            )
          },
          message:
            'Você não pode inativar uma área que possua vínculo com usuários e ou roteiros',
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
            return checkeds.some(
              (e) => e.user_count_value === 0 && e.route_count_value === 0,
            )
          },
          message:
            'Você não pode deletar uma área que possua vínculo com usuários e ou roteiros',
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
          content='Criar Nova Área'
          onClick={() =>
            setModal(
              <Modals.Create
                hierarchy_id={hierarchy.id}
                close={() => setModal(null)}
                reload={reload}
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
        centerCoodinates={{ y: 75 }}
      />
      <ManagerCounter partial={body.length} total={totalRegistries} />
      <Toaster position='bottom-right' />
      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager
